export interface Answer {
	id: string
	label: string
	score: number
}

export interface Next {
	answered?: string
	next_question: string
}

export interface NextLast {
	max_score?: number
	outcome: string
}

export interface Question {
	id: string
	question_text: string
	answers: Answer[]
	next: Next[] | NextLast[]
}

export interface Outcome {
	id: string
	text: string
	show_booking_button: boolean
}
