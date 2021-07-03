class Jokes {
    value: string
}

export class CreateHistoryDto {
    chatId: string
    jokes: [Jokes]
}
