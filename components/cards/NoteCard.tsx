import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currrentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
}

const NoteCard = ({
  id,
  currrentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
}: Props) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                layout="fill"
                className="rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1 ">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex gap-3">
              <Image
                src="/assets/heart-gray.svg"
                alt="Heart"
                width={20}
                height={20}
                className="cursor-pointer object-contain"
              />
              <Image
                src="/assets/repost.svg"
                alt="repost"
                width={20}
                height={20}
                className="cursor-pointer object-contain"
              />
              <Image
                src="/assets/reply.svg"
                alt="reply"
                width={20}
                height={20}
                className="cursor-pointer object-contain"
              />
              <Image
                src="/assets/share.svg"
                alt="share"
                width={20}
                height={20}
                className="cursor-pointer object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;