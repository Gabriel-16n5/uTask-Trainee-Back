export function unauthorizedError(resource: string) {
    return {
        name: "Unauthorized",
        message: `${resource}`
    }
  }