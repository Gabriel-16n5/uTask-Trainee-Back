export function ForbiddenError(resource: string) {
    return {
        name: "Forbidden",
        message: `${resource}`
    }
  }