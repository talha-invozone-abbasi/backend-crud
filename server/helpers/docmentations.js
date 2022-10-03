const User = {
  "/user": {
    get: {
      tags: ["User"],
      description: "get all user",
      responses: {
        200: {
          description: "Successfully ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["User"],
      description: "Create Single User",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  description: "Name of user",
                  example: "Talha Abbasi",
                },
                email: {
                  type: "string",
                  description: "email of user",
                  example: "admin@example.com",
                },
                username: {
                  type: "string",
                  description: "username of user",
                  example: "talha.abbasi",
                },
                password: {
                  type: "string",
                  description: "password of user",
                  example: "12345678",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/user/{id}": {
    get: {
      tags: ["User"],
      description: "Get single User",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User id",
          type: "string",
          example: "12",
        },
      ],
      responses: {
        200: {
          description: "Successfully ",

          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
  },
};

const auth = {
  "/auth/login": {
    post: {
      tags: ["auth"],
      description: "Login to get authentication token",
      requestBody: {
        description: "Please Enter your username and password",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",

                  description: "Name of user",
                  example: "talha@gmail.com",
                },
                password: {
                  type: "string",

                  description: "Password",
                  example: "12345678",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
  },
};
const books = {
  "/book": {
    get: {
      tags: ["Book"],
      description: "Get All books",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "array",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
  },
  "/book/{id}": {
    get: {
      description: "Select One book",
      tags: ["Book"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "User id",
          type: "string",
          example: "12",
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: [],
                },
              },
            },
          },
        },
      },
    },
  },
};
const swagerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Book Store",
    version: " 1.0.0 ",
    description: "This is a sample server for a Book store",
  },
  tags: [
    {
      name: "User",
      description: "All user here",
    },
    {
      name: "Book",
      description: "All books here",
    },
    {
      name: "auth",
      description: "All auth here",
    },
  ],
  servers: [
    {
      url: "http://localhost:4000/api",
      description: "all Api here",
    },
  ],
  paths: {
    ...User,
    ...auth,
    ...books,
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-auth-token",
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
};

module.exports = {
  swagerDocument,
};
