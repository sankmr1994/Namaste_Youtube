import React from "react";
const commentsData = [
  {
    name: "Santhosh",
    text: "comment0 : Your video is amazing",
    replies: [
      {
        name: "Santhosh",
        text: "comment : Your video is amazing",
        replies: [],
      },
    ],
  },
  {
    name: "Santhosh",
    text: "comment1 : Your video is amazing",
    replies: [
      {
        name: "Santhosh",
        text: "comment1-1 : Your video is amazing",
        replies: [
          {
            name: "Santhosh",
            text: "comment1-2 : Your video is amazing",
            replies: [],
          },
          {
            name: "Santhosh",
            text: "comment1-2 : Your video is amazing",
            replies: [],
          },
          {
            name: "Santhosh",
            text: "comment1-2 : Your video is amazing",
            replies: [],
          },
        ],
      },
      {
        name: "Santhosh",
        text: "comment1-1 : Your video is amazing",
        replies: [],
      },
      {
        name: "Santhosh",
        text: "comment1-1 : Your video is amazing",
        replies: [],
      },
      {
        name: "Santhosh",
        text: "comment1-1 : Your video is amazing",
        replies: [],
      },
    ],
  },
  { name: "Santhosh", text: "comment2 : Your video is amazing", replies: [] },
  { name: "Santhosh", text: "comment3 : Your video is amazing", replies: [] },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;

  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-md my-2">
      <img
        className="w-10 h-10"
        alt="user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbuRhZG_qXJ7Wk3f2AJMYNbodsUkzdKMZyEA&s"
      ></img>
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div
        className="pl-5 border
       border-l-black ml-5"
      >
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold"></h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
