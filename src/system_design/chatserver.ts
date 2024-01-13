/* 
Explain how you would design a chat server. In particular, provide details about the various
backend components, classes, and methods. What would be the hardest problems to solve?

Designing a chat server is a huge project, and it is certainly far beyond the scope of what could
be completed in an interview. After all, teams of many people spend months or years creating a
chat server. Part of your job, as a candidate, is to focus on an aspect of the problem that is
reasonably broad, but focused enough that you could accomplish it during an interview. It need
not match real life exactly, but it should be a fair representation of an actual implementation.

For our purposes, we'll focus on the core user management and conversation aspects: adding a
user, creating a conversation, updating one's status, and so on. In the interest of time and
space, we will not go into the networking aspects of the problem, or how the data actually gets
pushed out to the clients.

We will assume that "friending" is mutual; I am only your contact if you are mine. Our chat
system will support both group chat and one-on-one (private) chats. We will not worry about voice
chat, video chat, or file transfer.

==What specific actions does it need to support?
This is also something to discuss with your interviewer, but here are some ideas:
1. Signing online and offline.
2. Add requests (sending, accepting, and rejecting).
3. Updating a status message.
4. Creating private and group chats.
5. Adding new messages to private and group chats.

This is just a partial list. If you have more time, you can add more actions.

==What can we learn about these requirements?
We must have a concept of users, add request status, online status, and messages.

==What are the core components of the system?
The system would likely consist of a database, a set of clients, and a set of servers. We won't
include these parts in our object-oriented design, but we can discuss the overall view of the
system.

The database will be used for more permanent storage, such as the user list or chat archives. A
SQL database is a good bet, or, if we need more scalability, we could potentially use BigTable or
a similar system.

For communication between the client and servers, using XML will work well. Although it’s not the
most compressed format (and you should point this out to your interviewer), it’s nice because
it's easy for both computers and humans to read. Using XML will make your debugging efforts
easier—and that matters a lot.

The server will consist of a set of machines. Data will be divided up across machines, requiring
us to potentially hop from machine to machine. When possible, we will try to replicate some data
across machines to minimize the lookups. One major design constraint here is to prevent having a
single point of failure. For instance, if one machine controlled all the user sign-ins, then we'd
cut off millions of users potentially if a single machine lost network connectivity.

==What are the key objects and methods?

The key objects of the system will be a concept of users, conversations, and status messages.
We've implemented a User-Management class. If we were looking more at the networking aspects of
the problem, or a different component, we might have instead dived into those objects.

*/

enum RequestStatus {
  UNREAD,
  READ,
  ACCEPTED,
  REJECTED,
}

class UserService {
  private usersById: Record<number, User> = {};

  addUser(userId: number, name: string, passHash: string): void {
    // Implementation for adding a user
  }

  removeUser(userId: number): void {
    // Implementation for removing a user
  }

  addFriendRequest(fromUserId: number, toUserId: number): void {
    // Implementation for adding a friend request
  }

  approveFriendRequest(fromUserId: number, toUserId: number): void {
    // Implementation for approving a friend request
  }

  rejectFriendRequest(fromUserId: number, toUserId: number): void {
    // Implementation for rejecting a friend request
  }
}

class User {
  private friendsById: Record<number, User> = {};
  private friendIdsToPrivateChats: Record<number, PrivateChat> = {};
  private groupChatsById: Record<number, GroupChat> = {};
  private receivedFriendRequestsByFriendId: Record<number, AddRequest> = {};
  private sentFriendRequestsByFriendId: Record<number, AddRequest> = {};

  constructor(
    public userId: number,
    public name: string,
    public passHash: string
  ) { }

  messageUser(friendId: number, message: string): void {
    // Implementation for messaging a user
  }

  messageGroup(groupId: number, message: string): void {
    // Implementation for messaging a group
  }

  sendFriendRequest(friendId: number): void {
    // Implementation for sending a friend request
  }

  receiveFriendRequest(friendId: number): void {
    // Implementation for receiving a friend request
  }

  approveFriendRequest(friendId: number): void {
    // Implementation for approving a friend request
  }

  rejectFriendRequest(friendId: number): void {
    // Implementation for rejecting a friend request
  }
}

abstract class Chat {
  constructor(public chatId: number, public users: User[], public messages: Message[]) { }

  abstract addMessage(message: Message): void;
}

class PrivateChat extends Chat {
  constructor(firstUser: User, secondUser: User) {
    super(0, [firstUser, secondUser], []);
  }

  addMessage(message: Message): void {
    // Implementation for adding a message to a private chat
  }
}

class GroupChat extends Chat {
  addMessage(message: Message): void {
    // Implementation for adding a message to a group chat
  }

  addUser(user: User): void {
    // Implementation for adding a user to a group chat
  }

  removeUser(user: User): void {
    // Implementation for removing a user from a group chat
  }
}

class Message {
  constructor(public messageId: number, public message: string, public timestamp: number) { }
}

class AddRequest {
  constructor(
    public fromUserId: number,
    public toUserId: number,
    public requestStatus: RequestStatus,
    public timestamp: number
  ) { }
}


