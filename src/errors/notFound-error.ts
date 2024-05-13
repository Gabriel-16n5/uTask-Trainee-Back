export function notFoundError(resource: string) {
    return {
        name: "NotFound",
        message: `${resource}`
    }
  }