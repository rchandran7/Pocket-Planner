/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      image {
        bucket
        region
        key
        localUri
      }
      Tasks {
        nextToken
      }
      TimeFrame {
        id
        name
        startDate
        endDate
        createdAt
        updatedAt
      }
      users {
        nextToken
      }
      createdAt
      updatedAt
      groupTimeFrameId
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        groupTimeFrameId
      }
      nextToken
    }
  }
`;
export const getTimeFrame = /* GraphQL */ `
  query GetTimeFrame($id: ID!) {
    getTimeFrame(id: $id) {
      id
      name
      startDate
      endDate
      Meetings {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTimeFrames = /* GraphQL */ `
  query ListTimeFrames(
    $filter: ModelTimeFrameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeFrames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        startDate
        endDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
      id
      name
      description
      meetingDate
      isRecurring
      userID
      User {
        id
        name
        bio
        createdAt
        updatedAt
        owner
      }
      completed
      TimeFrame {
        id
        name
        startDate
        endDate
        createdAt
        updatedAt
      }
      timeframes {
        nextToken
      }
      createdAt
      updatedAt
      meetingTimeFrameId
    }
  }
`;
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        meetingDate
        isRecurring
        userID
        completed
        createdAt
        updatedAt
        meetingTimeFrameId
      }
      nextToken
    }
  }
`;
export const meetingsByUserID = /* GraphQL */ `
  query MeetingsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meetingsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        meetingDate
        isRecurring
        userID
        completed
        createdAt
        updatedAt
        meetingTimeFrameId
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      name
      deadline
      category
      description
      completed
      userID
      User {
        id
        name
        bio
        createdAt
        updatedAt
        owner
      }
      groupID
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        deadline
        category
        description
        completed
        userID
        groupID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tasksByUserID = /* GraphQL */ `
  query TasksByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        deadline
        category
        description
        completed
        userID
        groupID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tasksByGroupID = /* GraphQL */ `
  query TasksByGroupID(
    $groupID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByGroupID(
      groupID: $groupID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        deadline
        category
        description
        completed
        userID
        groupID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      image {
        bucket
        region
        key
        localUri
      }
      bio
      Tasks {
        nextToken
      }
      Meetings {
        nextToken
      }
      Groups {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image {
          bucket
          region
          key
          localUri
        }
        bio
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserGroup = /* GraphQL */ `
  query GetUserGroup($id: ID!) {
    getUserGroup(id: $id) {
      id
      groupId
      userId
      group {
        id
        createdAt
        updatedAt
        groupTimeFrameId
      }
      user {
        id
        name
        bio
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserGroups = /* GraphQL */ `
  query ListUserGroups(
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userGroupsByGroupId = /* GraphQL */ `
  query UserGroupsByGroupId(
    $groupId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGroupsByGroupId(
      groupId: $groupId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const userGroupsByUserId = /* GraphQL */ `
  query UserGroupsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGroupsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupId
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTimeFrameMeeting = /* GraphQL */ `
  query GetTimeFrameMeeting($id: ID!) {
    getTimeFrameMeeting(id: $id) {
      id
      timeFrameId
      meetingId
      timeFrame {
        id
        name
        startDate
        endDate
        createdAt
        updatedAt
      }
      meeting {
        id
        name
        description
        meetingDate
        isRecurring
        userID
        completed
        createdAt
        updatedAt
        meetingTimeFrameId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTimeFrameMeetings = /* GraphQL */ `
  query ListTimeFrameMeetings(
    $filter: ModelTimeFrameMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeFrameMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        timeFrameId
        meetingId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const timeFrameMeetingsByTimeFrameId = /* GraphQL */ `
  query TimeFrameMeetingsByTimeFrameId(
    $timeFrameId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimeFrameMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timeFrameMeetingsByTimeFrameId(
      timeFrameId: $timeFrameId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        timeFrameId
        meetingId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const timeFrameMeetingsByMeetingId = /* GraphQL */ `
  query TimeFrameMeetingsByMeetingId(
    $meetingId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimeFrameMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timeFrameMeetingsByMeetingId(
      meetingId: $meetingId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        timeFrameId
        meetingId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
