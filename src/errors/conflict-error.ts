export function conflictError(resource: string) {
    return {
        name: "conflict",
        message: `${resource}`
    }
  }