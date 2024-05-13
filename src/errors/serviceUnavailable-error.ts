export function ServiceUnavailableError(resource: string) {
    return {
        name: "ServiceUnavailable",
        message: `${resource}`
    }
  }