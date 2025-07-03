export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	organizationId: string;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean;
}

export interface Organization {
	id: string;
	name: string;
	code: string;
	type: OrganizationType;
	address: Address;
	contactInfo: ContactInfo;
	settings: OrganizationSettings;
	createdAt: Date;
	updatedAt: Date;
}

export interface Address {
	street: string;
	city: string;
	postalCode: string;
	province: string;
	country: string;
}

export interface ContactInfo {
	phone?: string;
	email?: string;
	website?: string;
}

export interface OrganizationSettings {
	reportTemplates: ReportTemplate[];
	defaultTemplate?: string;
	customFields: CustomField[];
	workflowEnabled: boolean;
	reviewRequired: boolean;
}

export interface Report {
	id: string;
	referenceNumber: string;
	title: string;
	content: string;
	templateId?: string;
	authorId: string;
	organizationId: string;
	status: ReportStatus;
	reviewStatus?: ReviewStatus;
	reviewerId?: string;
	reviewComments?: ReviewComment[];
	metadata: ReportMetadata;
	createdAt: Date;
	updatedAt: Date;
	version: number;
}

export interface ReportMetadata {
	tags: string[];
	category: ReportCategory;
	priority: Priority;
	estimatedBudget?: number;
	actualBudget?: number;
	department: string;
	relatedReports: string[];
	attachments: Attachment[];
}

export interface ReportTemplate {
	id: string;
	name: string;
	description: string;
	organizationId: string;
	category: ReportCategory;
	fields: TemplateField[];
	structure: TemplateStructure;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface TemplateField {
	id: string;
	name: string;
	type: FieldType;
	required: boolean;
	placeholder?: string;
	validation?: FieldValidation;
	defaultValue?: any;
	options?: string[]; // For select fields
}

export interface TemplateStructure {
	sections: ReportSection[];
	headerConfig: HeaderConfig;
	footerConfig: FooterConfig;
}

export interface ReportSection {
	id: string;
	title: string;
	order: number;
	required: boolean;
	fieldIds: string[];
	description?: string;
}

export interface HeaderConfig {
	showOrganizationLogo: boolean;
	showDate: boolean;
	showReferenceNumber: boolean;
	customText?: string;
}

export interface FooterConfig {
	showPageNumbers: boolean;
	showSignature: boolean;
	customText?: string;
}

export interface CustomField {
	id: string;
	name: string;
	type: FieldType;
	required: boolean;
	organizationId: string;
}

export interface ChatMessage {
	id: string;
	conversationId: string;
	type: MessageType;
	content: string;
	metadata?: MessageMetadata;
	timestamp: Date;
	userId?: string;
}

export interface MessageMetadata {
	extractedData?: ExtractedData;
	confidence?: number;
	suggestedFields?: SuggestedField[];
}

export interface ExtractedData {
	[key: string]: any;
}

export interface SuggestedField {
	fieldId: string;
	value: any;
	confidence: number;
}

export interface AIConfiguration {
	primaryProvider: AIProvider;
	fallbackProviders: AIProvider[];
	modelSettings: ModelSettings;
	promptTemplates: PromptTemplate[];
}

export interface PromptTemplate {
	id: string;
	name: string;
	template: string;
	category: ReportCategory;
	variables: string[];
}

export interface ModelSettings {
	temperature: number;
	maxTokens: number;
	topP: number;
	frequencyPenalty: number;
	presencePenalty: number;
}

export interface ReviewComment {
	id: string;
	reviewerId: string;
	comment: string;
	section?: string;
	status: CommentStatus;
	createdAt: Date;
	resolvedAt?: Date;
}

export interface Attachment {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	uploadedAt: Date;
	uploadedBy: string;
}

export interface FieldValidation {
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	customValidation?: string;
}

// Enums
export enum UserRole {
	ADMIN = 'admin',
	CREATOR = 'creator',
	REVIEWER = 'reviewer',
	VIEWER = 'viewer',
}

export enum OrganizationType {
	MUNICIPAL = 'municipal',
	PROVINCIAL = 'provincial',
	REGIONAL = 'regional',
	NATIONAL = 'national',
	OTHER = 'other',
}

export enum ReportStatus {
	DRAFT = 'draft',
	IN_REVIEW = 'in_review',
	APPROVED = 'approved',
	REJECTED = 'rejected',
	PUBLISHED = 'published',
	ARCHIVED = 'archived',
}

export enum ReviewStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	APPROVED = 'approved',
	REJECTED = 'rejected',
	CHANGES_REQUESTED = 'changes_requested',
}

export enum ReportCategory {
	PROCUREMENT = 'procurement',
	INFRASTRUCTURE = 'infrastructure',
	SERVICES = 'services',
	PERSONNEL = 'personnel',
	MAINTENANCE = 'maintenance',
	TECHNOLOGY = 'technology',
	OTHER = 'other',
}

export enum Priority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	URGENT = 'urgent',
}

export enum FieldType {
	TEXT = 'text',
	TEXTAREA = 'textarea',
	NUMBER = 'number',
	DATE = 'date',
	SELECT = 'select',
	MULTISELECT = 'multiselect',
	BOOLEAN = 'boolean',
	EMAIL = 'email',
	URL = 'url',
	CURRENCY = 'currency',
}

export enum MessageType {
	USER = 'user',
	ASSISTANT = 'assistant',
	SYSTEM = 'system',
}

export enum AIProvider {
	OPENAI = 'openai',
	ANTHROPIC = 'anthropic',
	AZURE = 'azure',
	LOCAL = 'local',
}

export enum CommentStatus {
	ACTIVE = 'active',
	RESOLVED = 'resolved',
	DISMISSED = 'dismissed',
}

// View types
export type ViewType =
	| 'dashboard'
	| 'new-report'
	| 'search-reports'
	| 'templates'
	| 'users'
	| 'settings'
	| `report-${string}`
	| `template-${string}`;

// API Response types
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
}

// Form types
export interface ReportFormData {
	referenceNumber: string;
	title: string;
	category: ReportCategory;
	priority: Priority;
	department: string;
	estimatedBudget?: number;
	tags: string[];
	templateId?: string;
	customFields: { [key: string]: any };
}

// Search and filter types
export interface ReportFilters {
	status?: ReportStatus[];
	category?: ReportCategory[];
	priority?: Priority[];
	dateRange?: DateRange;
	author?: string;
	tags?: string[];
	search?: string;
}

export interface DateRange {
	from: Date;
	to: Date;
}

// Export utilities
export interface ExportOptions {
	format: ExportFormat;
	includeMetadata: boolean;
	includeComments: boolean;
	template?: string;
}

export enum ExportFormat {
	PDF = 'pdf',
	DOCX = 'docx',
	HTML = 'html',
	JSON = 'json',
}
