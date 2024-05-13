export function invalidError(resource: string) {
    return {
        name: "invalid",
        message: `${resource}`
    }
  }