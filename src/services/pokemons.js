export async function getPokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) {
      return handleError(response.status)
    }

    const { results } = await response.json();

    return results;
  } catch (err) {
    if (err instanceof ServerError || err instanceof NotFoundError) {
      throw err;
    }
    throw new NetworkError();
  }
}

function handleError(status) {
  if (status === 500) {
    throw new ServerError();
  }

  if (status === 404) {
    throw new NotFoundError();
  }
}

export class NetworkError extends Error {
  constructor() {
    super('There was a network error. Please try again in a few seconds.');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('The requested resource was a not found.');
  }
}

export class ServerError extends Error {
  constructor() {
    super('There was a server error.');
  }
}