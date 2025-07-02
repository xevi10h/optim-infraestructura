export interface Report {
	id: number;
	referenceNumber: string;
	title: string;
	creationDate: string;
	status: 'draft' | 'finished';
	content?: string;
}

export interface ChatMessage {
	id: number;
	type: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

export type ViewType = 'new' | 'search' | `report-${number}`;
