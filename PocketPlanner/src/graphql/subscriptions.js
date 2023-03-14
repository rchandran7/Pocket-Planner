/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onCreateGroup(filter: $filter) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
    onUpdateGroup(filter: $filter) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
    onDeleteGroup(filter: $filter) {
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
export const onCreateTimeFrame = /* GraphQL */ `
  subscription OnCreateTimeFrame(
    $filter: ModelSubscriptionTimeFrameFilterInput
  ) {
    onCreateTimeFrame(filter: $filter) {
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
export const onUpdateTimeFrame = /* GraphQL */ `
  subscription OnUpdateTimeFrame(
    $filter: ModelSubscriptionTimeFrameFilterInput
  ) {
    onUpdateTimeFrame(filter: $filter) {
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
export const onDeleteTimeFrame = /* GraphQL */ `
  subscription OnDeleteTimeFrame(
    $filter: ModelSubscriptionTimeFrameFilterInput
  ) {
    onDeleteTimeFrame(filter: $filter) {
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
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onCreateMeeting(filter: $filter) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onUpdateMeeting(filter: $filter) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onDeleteMeeting(filter: $filter) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateUserGroup = /* GraphQL */ `
  subscription OnCreateUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
    $owner: String
  ) {
    onCreateUserGroup(filter: $filter, owner: $owner) {
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
export const onUpdateUserGroup = /* GraphQL */ `
  subscription OnUpdateUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
    $owner: String
  ) {
    onUpdateUserGroup(filter: $filter, owner: $owner) {
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
export const onDeleteUserGroup = /* GraphQL */ `
  subscription OnDeleteUserGroup(
    $filter: ModelSubscriptionUserGroupFilterInput
    $owner: String
  ) {
    onDeleteUserGroup(filter: $filter, owner: $owner) {
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
export const onCreateTimeFrameMeeting = /* GraphQL */ `
  subscription OnCreateTimeFrameMeeting(
    $filter: ModelSubscriptionTimeFrameMeetingFilterInput
  ) {
    onCreateTimeFrameMeeting(filter: $filter) {
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
export const onUpdateTimeFrameMeeting = /* GraphQL */ `
  subscription OnUpdateTimeFrameMeeting(
    $filter: ModelSubscriptionTimeFrameMeetingFilterInput
  ) {
    onUpdateTimeFrameMeeting(filter: $filter) {
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
export const onDeleteTimeFrameMeeting = /* GraphQL */ `
  subscription OnDeleteTimeFrameMeeting(
    $filter: ModelSubscriptionTimeFrameMeetingFilterInput
  ) {
    onDeleteTimeFrameMeeting(filter: $filter) {
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
