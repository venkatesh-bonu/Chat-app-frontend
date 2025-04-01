export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "jhon doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "jhon boi",
    _id: "2",
    groupChat: false,
    members: ["1"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "jhon doe",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "jhon boi",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "jhon boi",
    },
    _id: 1,
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "jhon boi",
    },
    _id: 2,
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdda",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "manishi manchodu",
    _id: "fdslksjdgsldjkewkf",
    sender: {
      _id: "user._id",
      name: "Chandu",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "asdda2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "nasa ",
    _id: "fdslksjdgsldjkewkfdlfksd",
    sender: {
      _id: "user._id2",
      name: "Chandu2",
    },
    chat: "chatId2",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "jhon boi",
      _id: "2",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "jhon bhai",
      _id: "3",
      username: "john_jangri",
      friends: 3,
      groups: 1,
    },
  ],
  chats: [
    {
      name: "hello andi",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: 1,
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Jhon Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Chi",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: 2,
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 4,
      totalMessages: 3,
      creator: {
        name: "Jhon Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Hi andi",
      _id: "sfsdkjslgsdf",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "chom",
      },
      groupChat: false,
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [{
        url : "https://www.w3schools.com/howto/img_avatar.png",
        public_id : "hello"

      }],
      content: "Hello",
      _id: "sfsdkjslgsdfdlk",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "chomdlfks",
      },
      groupChat: true,
      chat: "chatId2",
      createdAt: "2024-02-13T10:41:30.630Z",
    },
  ],
};
