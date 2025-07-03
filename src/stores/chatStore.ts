import { create } from 'zustand';
import {
	ChatMessage,
	ExtractedData,
	MessageType,
	ReportCategory,
} from '@/types'; // Remove 'type' from import

interface ChatState {
	conversations: { [reportId: string]: ChatMessage[] };
	currentConversationId: string | null;
	isGenerating: boolean;
	isLoading: boolean; // Add missing property
	extractedData: ExtractedData | null;
}

interface ChatActions {
	addMessage: (
		reportId: string,
		message: Omit<ChatMessage, 'id' | 'conversationId'>,
	) => void;
	clearConversation: (reportId: string) => void;
	clearMessages: (reportId: string) => void; // Add missing method
	setCurrentConversation: (reportId: string) => void;
	setGenerating: (isGenerating: boolean) => void;
	setIsLoading: (isLoading: boolean) => void; // Add missing method
	setExtractedData: (data: ExtractedData | null) => void;
	generateResponse: (reportId: string, userMessage: string) => Promise<void>;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
	// Initial state
	conversations: {},
	currentConversationId: null,
	isGenerating: false,
	isLoading: false,
	extractedData: null,

	// Actions
	addMessage: (
		reportId: string,
		message: Omit<ChatMessage, 'id' | 'conversationId'>,
	) => {
		const newMessage: ChatMessage = {
			...message,
			id: Date.now().toString(),
			conversationId: reportId,
		};

		set((state) => ({
			conversations: {
				...state.conversations,
				[reportId]: [...(state.conversations[reportId] || []), newMessage],
			},
		}));
	},

	clearConversation: (reportId: string) => {
		set((state) => ({
			conversations: {
				...state.conversations,
				[reportId]: [],
			},
			extractedData: null,
		}));
	},

	clearMessages: (reportId: string) => {
		set((state) => ({
			conversations: {
				...state.conversations,
				[reportId]: [],
			},
			extractedData: null,
		}));
	},

	setCurrentConversation: (reportId: string) => {
		set({ currentConversationId: reportId });
	},

	setGenerating: (isGenerating: boolean) => {
		set({ isGenerating });
	},

	setIsLoading: (isLoading: boolean) => {
		set({ isLoading });
	},

	setExtractedData: (data: ExtractedData | null) => {
		set({ extractedData: data });
	},

	generateResponse: async (reportId: string, userMessage: string) => {
		const { addMessage, setGenerating, setExtractedData } = get();

		// Add user message
		addMessage(reportId, {
			type: MessageType.USER,
			content: userMessage,
			timestamp: new Date(),
		});

		setGenerating(true);

		try {
			// Mock AI response - replace with actual AI integration
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Generate contextual response based on user input
			let aiResponse = '';
			let extractedData: ExtractedData = {};

			// Analyze user input for different types of requests
			const lowerInput = userMessage.toLowerCase();

			if (
				lowerInput.includes('ordenador') ||
				lowerInput.includes('computer') ||
				lowerInput.includes('equipamiento')
			) {
				aiResponse = `Based on your request for computer equipment, I'll help you create a comprehensive justification report.

**OBJECT IDENTIFICATION**
Computer equipment procurement for office modernization and digital transformation initiatives.

**TECHNICAL JUSTIFICATION**
The proposed acquisition of computer equipment responds to the critical need to:
- Maintain operational efficiency of administrative processes
- Ensure compliance with current cybersecurity standards
- Support remote work capabilities and digital collaboration
- Replace obsolete equipment that poses security and productivity risks

The technical specifications align with current market standards and organizational requirements for performance, compatibility, and long-term support.

**ECONOMIC JUSTIFICATION**
The estimated budget has been calculated based on:
- Comparative market analysis from certified suppliers
- Total cost of ownership including warranty and support
- Energy efficiency considerations for operational cost reduction
- Bulk purchasing advantages for multiple units

**EXPECTED BENEFITS**
- Improved productivity through faster processing capabilities
- Enhanced security with modern operating systems and hardware
- Reduced maintenance costs and downtime
- Better user experience for staff and citizens

Would you like me to expand on any specific section or add additional details?`;

				extractedData = {
					title: 'Computer Equipment Procurement Report',
					category: ReportCategory.TECHNOLOGY,
					estimatedBudget: 15000,
					department: 'IT Department',
					tags: ['equipment', 'technology', 'procurement'],
				};
			} else if (
				lowerInput.includes('limpieza') ||
				lowerInput.includes('cleaning') ||
				lowerInput.includes('neteja')
			) {
				aiResponse = `I'll help you create a justification report for cleaning services.

**OBJECT IDENTIFICATION**
Contracting of professional cleaning services for the maintenance and hygiene of public facilities.

**TECHNICAL JUSTIFICATION**
The cleaning service contract is essential to:
- Maintain adequate hygiene standards in public spaces
- Comply with health and safety regulations
- Ensure a professional environment for staff and visitors
- Prevent deterioration of facilities and equipment

The service specifications include specialized cleaning protocols, eco-friendly products, and trained personnel certified in public facility maintenance.

**ECONOMIC JUSTIFICATION**
The contract value represents:
- Competitive pricing based on market research
- Cost-effective solution compared to in-house management
- Included supplies, equipment, and specialized products
- Performance guarantees and service level agreements

**EXPECTED BENEFITS**
- Consistent maintenance of cleanliness standards
- Professional expertise in facility management
- Reduced administrative burden on internal staff
- Health and safety compliance assurance

Would you like me to adjust any section or add specific requirements?`;

				extractedData = {
					title: 'Cleaning Services Contract Report',
					category: ReportCategory.SERVICES,
					estimatedBudget: 25000,
					department: 'Facility Management',
					tags: ['cleaning', 'services', 'maintenance'],
				};
			} else if (
				lowerInput.includes('obra') ||
				lowerInput.includes('construction') ||
				lowerInput.includes('mejora')
			) {
				aiResponse = `I'll create a justification report for infrastructure improvement works.

**OBJECT IDENTIFICATION**
Infrastructure improvement and maintenance works to enhance facility conditions and operational capacity.

**TECHNICAL JUSTIFICATION**
The proposed construction works are necessary to:
- Address structural maintenance requirements
- Improve accessibility and safety standards
- Enhance energy efficiency and sustainability
- Modernize facilities to meet current regulations

Technical specifications include certified materials, professional contractors, and compliance with building codes and safety standards.

**ECONOMIC JUSTIFICATION**
The investment is justified by:
- Preventive maintenance reducing long-term costs
- Energy savings from efficiency improvements
- Increased property value and functionality
- Compliance with regulatory requirements avoiding penalties

**EXPECTED BENEFITS**
- Extended facility lifespan and reduced maintenance
- Improved working conditions and safety
- Enhanced public service delivery capacity
- Environmental sustainability improvements

Shall I provide more specific details for any particular aspect?`;

				extractedData = {
					title: 'Infrastructure Improvement Works Report',
					category: ReportCategory.INFRASTRUCTURE,
					estimatedBudget: 75000,
					department: 'Public Works',
					tags: ['construction', 'infrastructure', 'maintenance'],
				};
			} else {
				// Generic response for other types of requests
				aiResponse = `I'll help you create a comprehensive justification report based on your requirements.

**OBJECT IDENTIFICATION**
${userMessage}

**TECHNICAL JUSTIFICATION**
The proposed action responds to identified organizational needs and aligns with strategic objectives. The technical approach ensures:
- Compliance with applicable regulations and standards
- Efficient resource utilization and performance optimization
- Integration with existing systems and processes
- Quality assurance and risk mitigation

**ECONOMIC JUSTIFICATION**
The financial proposal represents:
- Market-competitive pricing and value for money
- Cost-benefit analysis supporting the investment
- Budget alignment with organizational priorities
- Long-term sustainability and return on investment

**EXPECTED BENEFITS**
- Achievement of stated objectives and requirements
- Improved operational efficiency and effectiveness
- Enhanced service quality and stakeholder satisfaction
- Strategic value creation for the organization

Would you like me to customize this report further or focus on specific aspects?`;

				extractedData = {
					title: 'General Justification Report',
					category: ReportCategory.OTHER,
					department: 'General Administration',
					tags: ['justification', 'general'],
				};
			}

			// Add AI response
			addMessage(reportId, {
				type: MessageType.ASSISTANT,
				content: aiResponse,
				timestamp: new Date(),
				metadata: {
					extractedData,
					confidence: 0.85,
					suggestedFields: Object.entries(extractedData).map(
						([key, value]) => ({
							fieldId: key,
							value,
							confidence: 0.8,
						}),
					),
				},
			});

			setExtractedData(extractedData);
		} catch (error) {
			addMessage(reportId, {
				type: MessageType.SYSTEM,
				content:
					'Sorry, I encountered an error while generating the response. Please try again.',
				timestamp: new Date(),
			});
		} finally {
			setGenerating(false);
		}
	},
}));
