'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	FileText,
	Search,
	Plus,
	Edit3,
	Trash2,
	Eye,
	Menu,
	X,
	MessageSquare,
	Save,
	Download,
	Copy,
} from 'lucide-react';

const InformesJustificativosApp = () => {
	const [currentView, setCurrentView] = useState('nuevo');
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [numeroReferencia, setNumeroReferencia] = useState('');
	const [tituloInforme, setTituloInforme] = useState('');
	const [contenidoGenerado, setContenidoGenerado] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [informesGuardados, setInformesGuardados] = useState([
		{
			id: 1,
			numeroReferencia: 'INF-2024-001',
			titulo: 'Suministro de Material Informático',
			fechaCreacion: '2024-07-01',
			estado: 'finalizado',
		},
		{
			id: 2,
			numeroReferencia: 'INF-2024-002',
			titulo: 'Contratación Servicio de Limpieza',
			fechaCreacion: '2024-06-28',
			estado: 'borrador',
		},
		{
			id: 3,
			numeroReferencia: 'INF-2024-003',
			titulo: 'Obras de Mejora en Instalaciones',
			fechaCreacion: '2024-06-25',
			estado: 'finalizado',
		},
	]);

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		const newMessage = {
			id: Date.now(),
			type: 'user',
			content: inputMessage,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, newMessage]);
		setInputMessage('');
		setIsLoading(true);

		// Simular respuesta de IA
		setTimeout(() => {
			const aiResponse = {
				id: Date.now() + 1,
				type: 'assistant',
				content: generateMockInforme(inputMessage),
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, aiResponse]);
			setContenidoGenerado(aiResponse.content);
			setIsLoading(false);
		}, 2000);
	};

	const generateMockInforme = (prompt) => {
		return `INFORME JUSTIFICATIVO

1. IDENTIFICACIÓN DEL OBJETO
${
	prompt.includes('material') || prompt.includes('suministro')
		? 'Suministro de material informático para modernización del equipamiento de la oficina.'
		: 'Contratación de servicios necesarios para el funcionamiento administrativo.'
}

2. JUSTIFICACIÓN TÉCNICA
La adquisición propuesta responde a la necesidad de mantener la eficiencia operativa de la administración, garantizando el cumplimiento de los estándares de calidad exigidos.

3. JUSTIFICACIÓN ECONÓMICA
El presupuesto estimado se considera ajustado a precios de mercado, habiendo realizado un análisis comparativo de ofertas disponibles.

4. BENEFICIOS ESPERADOS
- Mejora de la productividad administrativa
- Reducción de costes operativos a medio plazo
- Garantía de continuidad del servicio público

5. CONCLUSIONES Y RECOMENDACIONES
Se recomienda proceder con la contratación/adquisición propuesta, dado que cumple con todos los requisitos técnicos y económicos establecidos en la normativa vigente.

Fecha: ${new Date().toLocaleDateString('es-ES')}
Responsable: [Nombre del funcionario]`;
	};

	const handleSaveInforme = () => {
		if (!numeroReferencia || !tituloInforme || !contenidoGenerado) {
			alert('Por favor, completa todos los campos obligatorios');
			return;
		}

		const nuevoInforme = {
			id: Date.now(),
			numeroReferencia,
			titulo: tituloInforme,
			fechaCreacion: new Date().toISOString().split('T')[0],
			estado: 'borrador',
			contenido: contenidoGenerado,
		};

		setInformesGuardados((prev) => [nuevoInforme, ...prev]);
		alert('Informe guardado correctamente');

		// Limpiar formulario
		setNumeroReferencia('');
		setTituloInforme('');
		setContenidoGenerado('');
		setMessages([]);
	};

	const filteredInformes = informesGuardados.filter(
		(informe) =>
			informe.numeroReferencia
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			informe.titulo.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const Sidebar = () => (
		<div
			className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
				sidebarOpen ? 'w-64' : 'w-0'
			} overflow-hidden flex flex-col`}
		>
			<div className="p-4 border-b border-gray-700">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-bold">Informes IA</h1>
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden text-gray-400 hover:text-white"
					>
						<X size={20} />
					</button>
				</div>
			</div>

			<nav className="flex-1 p-4">
				<button
					onClick={() => setCurrentView('nuevo')}
					className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
						currentView === 'nuevo' ? 'bg-blue-600' : 'hover:bg-gray-800'
					}`}
				>
					<Plus size={20} />
					Nuevo Informe
				</button>

				<button
					onClick={() => setCurrentView('buscar')}
					className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
						currentView === 'buscar' ? 'bg-blue-600' : 'hover:bg-gray-800'
					}`}
				>
					<Search size={20} />
					Buscar Informes
				</button>

				<div className="mt-6">
					<h3 className="text-sm font-semibold text-gray-400 mb-3">
						INFORMES RECIENTES
					</h3>
					{informesGuardados.slice(0, 5).map((informe) => (
						<button
							key={informe.id}
							onClick={() => setCurrentView(`informe-${informe.id}`)}
							className="w-full flex items-center gap-3 p-2 rounded-lg mb-1 hover:bg-gray-800 text-left"
						>
							<FileText size={16} />
							<div className="truncate">
								<div className="text-sm truncate">{informe.titulo}</div>
								<div className="text-xs text-gray-400">
									{informe.numeroReferencia}
								</div>
							</div>
						</button>
					))}
				</div>
			</nav>
		</div>
	);

	const ChatInterface = () => (
		<div className="flex flex-col h-96 border border-gray-300 rounded-lg bg-white">
			<div className="flex-1 overflow-y-auto p-4">
				{messages.length === 0 && (
					<div className="text-center text-gray-500 mt-20">
						<MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium mb-2">
							¡Hola! Soy tu asistente para informes justificativos
						</p>
						<p className="text-sm">
							Describe qué necesitas y te ayudaré a crear el informe perfecto
						</p>
						<div className="mt-6 space-y-2">
							<div className="bg-gray-50 p-3 rounded-lg text-left">
								<p className="font-medium text-sm">
									Ejemplos de lo que puedes pedirme:
								</p>
								<ul className="text-xs text-gray-600 mt-2 space-y-1">
									<li>
										• "Necesito justificar la compra de 10 ordenadores para la
										oficina"
									</li>
									<li>
										• "Quiero contratar un servicio de limpieza para el
										edificio"
									</li>
									<li>
										• "Necesito hacer obras de mejora en las instalaciones"
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`mb-4 flex ${
							message.type === 'user' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-3xl px-4 py-3 rounded-lg ${
								message.type === 'user'
									? 'bg-blue-500 text-white'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							<div className="whitespace-pre-wrap">{message.content}</div>
							<div className="text-xs opacity-70 mt-2">
								{message.timestamp.toLocaleTimeString('es-ES', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</div>
						</div>
					</div>
				))}

				{isLoading && (
					<div className="flex justify-start mb-4">
						<div className="bg-gray-100 px-4 py-3 rounded-lg">
							<div className="flex items-center gap-2">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
								<span className="text-gray-600">Generando informe...</span>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className="border-t border-gray-200 p-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={(e) =>
							e.key === 'Enter' && !e.shiftKey && handleSendMessage()
						}
						placeholder="Describe qué informe justificativo necesitas..."
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						disabled={isLoading}
					/>
					<button
						onClick={handleSendMessage}
						disabled={isLoading || !inputMessage.trim()}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Send size={20} />
					</button>
				</div>
			</div>
		</div>
	);

	const NuevoInformeView = () => (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Nuevo Informe Justificativo
				</h1>
				<p className="text-gray-600">
					Utiliza la IA para generar informes justificativos profesionales
				</p>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				{/* Panel Izquierdo - Configuración */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<FileText className="text-blue-500" size={24} />
							Información del Informe
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Número de Referencia *
								</label>
								<input
									type="text"
									value={numeroReferencia}
									onChange={(e) => setNumeroReferencia(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Ej: INF-2024-001"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Título del Informe *
								</label>
								<input
									type="text"
									value={tituloInforme}
									onChange={(e) => setTituloInforme(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Título descriptivo del informe"
								/>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<MessageSquare className="text-green-500" size={20} />
							Asistente IA
						</h3>
						<ChatInterface />
					</div>
				</div>

				{/* Panel Derecho - Vista Previa */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold flex items-center gap-2">
								<Eye className="text-purple-500" size={24} />
								Vista Previa del Informe
							</h2>

							{contenidoGenerado && (
								<div className="flex gap-2">
									<button
										onClick={() =>
											navigator.clipboard.writeText(contenidoGenerado)
										}
										className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
										title="Copiar contenido"
									>
										<Copy size={16} />
									</button>
									<button
										onClick={() => {
											/* Implementar descarga */
										}}
										className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
										title="Descargar PDF"
									>
										<Download size={16} />
									</button>
								</div>
							)}
						</div>

						<div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-96 max-h-96 overflow-y-auto">
							{contenidoGenerado ? (
								<div className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
									{contenidoGenerado}
								</div>
							) : (
								<div className="flex items-center justify-center h-full text-gray-500">
									<div className="text-center">
										<FileText
											size={48}
											className="mx-auto mb-4 text-gray-300"
										/>
										<p className="text-lg font-medium">
											El informe aparecerá aquí
										</p>
										<p className="text-sm">
											Usa el chat para generar el contenido
										</p>
									</div>
								</div>
							)}
						</div>

						<div className="mt-6 flex gap-4">
							<button
								onClick={handleSaveInforme}
								disabled={
									!contenidoGenerado || !numeroReferencia || !tituloInforme
								}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<Save size={20} />
								Guardar Informe
							</button>

							<button
								onClick={() => {
									setContenidoGenerado('');
									setMessages([]);
								}}
								className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
							>
								Limpiar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const BuscarInformesView = () => (
		<div className="max-w-6xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Buscar Informes
				</h1>
				<p className="text-gray-600">
					Encuentra y gestiona tus informes justificativos
				</p>
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
				<div className="flex gap-4 mb-6">
					<div className="flex-1 relative">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Buscar por número de referencia o título..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				<div className="space-y-3">
					{filteredInformes.map((informe) => (
						<div
							key={informe.id}
							className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
											{informe.numeroReferencia}
										</span>
										<span
											className={`text-xs px-2 py-1 rounded-full font-medium ${
												informe.estado === 'finalizado'
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{informe.estado}
										</span>
									</div>
									<h3 className="font-semibold text-gray-900 mb-1">
										{informe.titulo}
									</h3>
									<p className="text-sm text-gray-500">
										Creado el{' '}
										{new Date(informe.fechaCreacion).toLocaleDateString(
											'es-ES',
										)}
									</p>
								</div>

								<div className="flex gap-2">
									<button
										onClick={() => setCurrentView(`informe-${informe.id}`)}
										className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
										title="Ver informe"
									>
										<Eye size={16} />
									</button>
									<button
										className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
										title="Editar informe"
									>
										<Edit3 size={16} />
									</button>
									<button
										className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
										title="Eliminar informe"
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</div>
					))}

					{filteredInformes.length === 0 && (
						<div className="text-center py-12">
							<FileText size={48} className="mx-auto mb-4 text-gray-300" />
							<p className="text-gray-500">
								{searchQuery
									? 'No se encontraron informes que coincidan con tu búsqueda'
									: 'No hay informes guardados'}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	const InformeDetailView = ({ informeId }) => {
		const informe = informesGuardados.find((i) => i.id === parseInt(informeId));

		if (!informe) return <div>Informe no encontrado</div>;

		return (
			<div className="max-w-4xl mx-auto p-6">
				<div className="bg-white rounded-lg border border-gray-200 p-8">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								{informe.titulo}
							</h1>
							<p className="text-gray-600 mt-1">
								Referencia: {informe.numeroReferencia}
							</p>
						</div>
						<div className="flex gap-2">
							<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
								<Edit3 size={16} />
								Editar
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
								<Download size={16} />
								Descargar
							</button>
						</div>
					</div>

					<div className="prose max-w-none">
						<div className="whitespace-pre-wrap text-sm leading-relaxed">
							{informe.contenido || generateMockInforme('ejemplo')}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderCurrentView = () => {
		if (currentView === 'nuevo') return <NuevoInformeView />;
		if (currentView === 'buscar') return <BuscarInformesView />;
		if (currentView.startsWith('informe-')) {
			const informeId = currentView.split('-')[1];
			return <InformeDetailView informeId={informeId} />;
		}
		return <NuevoInformeView />;
	};

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="text-gray-600 hover:text-gray-900"
						>
							<Menu size={24} />
						</button>

						<div className="flex items-center gap-4">
							<div className="text-sm text-gray-600">
								Administración Pública Digital
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto">{renderCurrentView()}</main>
			</div>
		</div>
	);
};

export default InformesJustificativosApp;
