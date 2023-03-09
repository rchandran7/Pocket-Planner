/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
    }
  }
`;
//TODO: Need updateMeeting, deleteMeeting, createClass, updateClass
 export const createMeeting =  `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      name
      meetingDate
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
      createdAt
      updatedAt
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
      meetingDate
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      name
      meetingDate
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
      createdAt
      updatedAt
      owner
    }
  }
`;