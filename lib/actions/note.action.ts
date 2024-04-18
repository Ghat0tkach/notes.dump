"use server";

import Note from "../models/note.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  courseId: string | null;
  path: string;
}

export async function createNotes({ text, author, courseId, path }: Params) {
  try {
    connectToDB();
    const note = await Note.create({
      text,
      author,
      courses: null,
    });
    await User.findByIdAndUpdate(author, {
      $push: { notes: note._id },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Failed to create Thread", error.message);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    //fetch that have no parents
    const postsQuery = Note.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Note.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error("Failed to fetch posts", error.message);
  }
}
