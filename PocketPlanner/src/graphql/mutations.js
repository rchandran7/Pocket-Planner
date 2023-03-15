/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
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
export const createTimeFrame = /* GraphQL */ `
  mutation CreateTimeFrame(
    $input: CreateTimeFrameInput!
    $condition: ModelTimeFrameConditionInput
  ) {
    createTimeFrame(input: $input, condition: $condition) {
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
export const updateTimeFrame = /* GraphQL */ `
  mutation UpdateTimeFrame(
    $input: UpdateTimeFrameInput!
    $condition: ModelTimeFrameConditionInput
  ) {
    updateTimeFrame(input: $input, condition: $condition) {
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
export const deleteTimeFrame = /* GraphQL */ `
  mutation DeleteTimeFrame(
    $input: DeleteTimeFrameInput!
    $condition: ModelTimeFrameConditionInput
  ) {
    deleteTimeFrame(input: $input, condition: $condition) {
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
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
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
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeeting(input: $input, condition: $condition) {
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
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeeting(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserGroup = /* GraphQL */ `
  mutation CreateUserGroup(
    $input: CreateUserGroupInput!
    $condition: ModelUserGroupConditionInput
  ) {
    createUserGroup(input: $input, condition: $condition) {
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
export const updateUserGroup = /* GraphQL */ `
  mutation UpdateUserGroup(
    $input: UpdateUserGroupInput!
    $condition: ModelUserGroupConditionInput
  ) {
    updateUserGroup(input: $input, condition: $condition) {
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
export const deleteUserGroup = /* GraphQL */ `
  mutation DeleteUserGroup(
    $input: DeleteUserGroupInput!
    $condition: ModelUserGroupConditionInput
  ) {
    deleteUserGroup(input: $input, condition: $condition) {
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
export const createTimeFrameMeeting = /* GraphQL */ `
  mutation CreateTimeFrameMeeting(
    $input: CreateTimeFrameMeetingInput!
    $condition: ModelTimeFrameMeetingConditionInput
  ) {
    createTimeFrameMeeting(input: $input, condition: $condition) {
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
export const updateTimeFrameMeeting = /* GraphQL */ `
  mutation UpdateTimeFrameMeeting(
    $input: UpdateTimeFrameMeetingInput!
    $condition: ModelTimeFrameMeetingConditionInput
  ) {
    updateTimeFrameMeeting(input: $input, condition: $condition) {
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
export const deleteTimeFrameMeeting = /* GraphQL */ `
  mutation DeleteTimeFrameMeeting(
    $input: DeleteTimeFrameMeetingInput!
    $condition: ModelTimeFrameMeetingConditionInput
  ) {
    deleteTimeFrameMeeting(input: $input, condition: $condition) {
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
