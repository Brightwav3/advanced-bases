import { getLanguage } from "obsidian";

export interface LocaleStrings {
  newNoteButton: string;
  createFailed: string;
  templateMissing: string;
  noteExists: string;
  enableButtonName: string;
  enableButtonDesc: string;
  folderName: string;
  folderDesc: string;
  templateName: string;
  templateDesc: string;
  showIconName: string;
  cardWidthName: string;
  showPropertiesName: string;
  showMore: string;
  previewFailed: string;
  imagePropertyName: string;
  imageFitName: string;
  imageFitCoverLabel: string;
  imageFitContainLabel: string;
  aspectRatioName: string;
  compactCardSettingsGroupName: string;
  compactToggleName: string;
  timelineDatePropertyName: string;
  timelineEndDatePropertyName: string;
  timelineGroupPropertyName: string;
  timelineLaneHeightName: string;
  timelineEmptyState: string;
  timelineTodayMarkerColorName: string;
  timelineTodayMarkerColorDesc: string;
  settingsIntro: string;
  settingsFeedHeading: string;
  settingsCardsCompactHeading: string;
  settingsCardsCompactDesc: string;
  settingsTimelineHeading: string;
  helpAria: string;
  feedHelpLine1: string;
  feedHelpLine2: string;
  compactHelpLine1: string;
  compactHelpLine2: string;
  timelineHelpLine1: string;
  timelineHelpLine2: string;
  timelineHelpLine3: string;
}

const en: LocaleStrings = {
  newNoteButton: "New note",
  createFailed: "Could not create the note.",
  templateMissing: "Template not found: {path}",
  noteExists: "Note already exists: {path}",
  enableButtonName: 'Show "New note" button',
  enableButtonDesc:
    "Adds a button to the Feed view toolbar that creates a new note linked to the current Base.",
  folderName: "Folder for new notes",
  folderDesc: "Vault-relative path to the folder where new notes are saved.",
  templateName: "Template",
  templateDesc: "Vault-relative path to the template file used for new notes.",
  showIconName: "Show file icon",
  cardWidthName: "Card width",
  showPropertiesName: "Show properties",
  showMore: "Show more",
  previewFailed: "(Preview could not be rendered.)",
  imagePropertyName: "Image property",
  imageFitName: "Image fit",
  imageFitCoverLabel: "Cover",
  imageFitContainLabel: "Contain",
  aspectRatioName: "Image aspect ratio",
  compactCardSettingsGroupName: "Compact card settings",
  compactToggleName: "Compact",
  timelineDatePropertyName: "Date property",
  timelineEndDatePropertyName: "End date property",
  timelineGroupPropertyName: "Group property (lanes)",
  timelineLaneHeightName: "Lane height",
  timelineEmptyState: "No entries to show on the timeline.",
  timelineTodayMarkerColorName: "Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "Feed view",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "Timeline view",
  helpAria: "View help",
  feedHelpLine1: "Click a note's title to open it.",
  feedHelpLine2: 'Use "New note" to create a note linked to this Base.',
  compactHelpLine1: "Toggle Compact to switch between the two layouts.",
  compactHelpLine2: "Click a card to open its note.",
  timelineHelpLine1: "Ctrl+scroll (or pinch) to zoom, plain scroll to pan.",
  timelineHelpLine2: "Click a bar or marker to open its note.",
  timelineHelpLine3: "Click a lane's color swatch to change its color.",
};

const cs: LocaleStrings = {
  newNoteButton: "Nová poznámka",
  createFailed: "Nepodařilo se vytvořit poznámku.",
  templateMissing: "Nelze najít šablonu: {path}",
  noteExists: "Poznámka už existuje: {path}",
  enableButtonName: 'Zobrazit tlačítko "Nová poznámka"',
  enableButtonDesc:
    "Přidá do panelu Feed view tlačítko, které vytvoří novou poznámku provázanou s aktuální Base.",
  folderName: "Složka pro nové poznámky",
  folderDesc: "Vault-relativní cesta ke složce, kam se ukládají nové poznámky.",
  templateName: "Šablona",
  templateDesc: "Vault-relativní cesta k souboru šablony použité pro nové poznámky.",
  showIconName: "Zobrazit ikonu souboru",
  cardWidthName: "Šířka karty",
  showPropertiesName: "Zobrazit vlastnosti",
  showMore: "Zobrazit více",
  previewFailed: "(Náhled se nepodařilo vykreslit.)",
  imagePropertyName: "Vlastnost obrázku",
  imageFitName: "Přizpůsobení obrázku",
  imageFitCoverLabel: "Vyplnit",
  imageFitContainLabel: "Celý obrázek",
  aspectRatioName: "Poměr stran obrázku",
  compactCardSettingsGroupName: "Nastavení kompaktních karet",
  compactToggleName: "Kompaktní",
  timelineDatePropertyName: "Vlastnost data",
  timelineEndDatePropertyName: "Vlastnost koncového data",
  timelineGroupPropertyName: "Vlastnost seskupení (řádky)",
  timelineLaneHeightName: "Výška řádku",
  timelineEmptyState: "V časové ose nejsou žádné položky k zobrazení.",
  timelineTodayMarkerColorName: "Barva značky dnešního dne v Timeline",
  timelineTodayMarkerColorDesc:
    "Přepíše výchozí barvu (přizpůsobenou motivu), kterou má svislá čára označující dnešní datum v zobrazení Timeline.",
  settingsIntro:
    "Tato nastavení platí globálně pro každou Bázi, která používá zobrazení Advanced Bases. Nastavení zobrazení jednotlivých Bází — jako šířka karty, přizpůsobení obrázku nebo výška řádku — se nastavují zvlášť ve vlastním nastavení zobrazení dané Báze.",
  settingsFeedHeading: "Zobrazení Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact nemá žádná globální nastavení. Jeho nastavení zobrazení (kompaktní režim, šířka karty, přizpůsobení obrázku, vlastnost obrázku, zobrazení ikony) se nastavují pro každou Bázi zvlášť — otevřete Bázi používající zobrazení Cards Compact a upravte její nastavení zobrazení v postranním panelu.",
  settingsTimelineHeading: "Zobrazení Timeline",
  helpAria: "Nápověda k zobrazení",
  feedHelpLine1: "Kliknutím na název poznámky ji otevřete.",
  feedHelpLine2: 'Pomocí "Nová poznámka" vytvoříte poznámku propojenou s touto Bází.',
  compactHelpLine1: "Přepnutím Kompaktní přepnete mezi dvěma rozvrženími.",
  compactHelpLine2: "Kliknutím na kartu otevřete její poznámku.",
  timelineHelpLine1: "Ctrl+kolečko (nebo sevření prsty) přiblíží, obyčejné kolečko posouvá.",
  timelineHelpLine2: "Kliknutím na pruh nebo značku otevřete její poznámku.",
  timelineHelpLine3: "Kliknutím na barevný vzorek dráhy změníte její barvu.",
};

const de: LocaleStrings = {
  newNoteButton: "Neue Notiz",
  createFailed: "Die Notiz konnte nicht erstellt werden.",
  templateMissing: "Vorlage nicht gefunden: {path}",
  noteExists: "Notiz existiert bereits: {path}",
  enableButtonName: 'Schaltfläche "Neue Notiz" anzeigen',
  enableButtonDesc:
    "Fügt der Feed-Symbolleiste eine Schaltfläche hinzu, die eine neue, mit der aktuellen Base verknüpfte Notiz erstellt.",
  folderName: "Ordner für neue Notizen",
  folderDesc: "Tresorrelativer Pfad zum Ordner, in dem neue Notizen gespeichert werden.",
  templateName: "Vorlage",
  templateDesc: "Tresorrelativer Pfad zur Vorlagendatei für neue Notizen.",
  showIconName: "Dateisymbol anzeigen",
  cardWidthName: "Kartenbreite",
  showPropertiesName: "Eigenschaften anzeigen",
  showMore: "Mehr anzeigen",
  previewFailed: "(Vorschau konnte nicht gerendert werden.)",
  imagePropertyName: "Bildeigenschaft",
  imageFitName: "Bildanpassung",
  imageFitCoverLabel: "Ausfüllen",
  imageFitContainLabel: "Einpassen",
  aspectRatioName: "Seitenverhältnis des Bildes",
  compactCardSettingsGroupName: "Einstellungen für kompakte Karten",
  compactToggleName: "Kompakt",
  timelineDatePropertyName: "Datumseigenschaft",
  timelineEndDatePropertyName: "Enddatumseigenschaft",
  timelineGroupPropertyName: "Gruppierungseigenschaft (Spuren)",
  timelineLaneHeightName: "Spurhöhe",
  timelineEmptyState: "Keine Einträge für die Zeitleiste vorhanden.",
  timelineTodayMarkerColorName: "Farbe der Heute-Markierung in der Zeitleiste",
  timelineTodayMarkerColorDesc:
    "Überschreibt die standardmäßig designabhängige Farbe der senkrechten Linie, die das heutige Datum in der Zeitleisten-Ansicht markiert.",
  settingsIntro:
    "Diese Einstellungen gelten global für jede Base, die eine Advanced-Bases-Ansicht verwendet. Ansichtsspezifische Optionen pro Base – wie Kartenbreite, Bildanpassung oder Spurhöhe – werden separat in den eigenen Ansichtseinstellungen jeder Base konfiguriert.",
  settingsFeedHeading: "Feed-Ansicht",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact hat keine globalen Einstellungen. Ihre Anzeigeoptionen (Kompaktmodus, Kartenbreite, Bildanpassung, Bildeigenschaft, Symbolanzeige) werden pro Base konfiguriert – öffnen Sie eine Base mit der Cards-Compact-Ansicht und bearbeiten Sie deren Ansichtseinstellungen in der Seitenleiste.",
  settingsTimelineHeading: "Zeitleisten-Ansicht",
  helpAria: "Ansichtshilfe",
  feedHelpLine1: "Klicken Sie auf den Titel einer Notiz, um sie zu öffnen.",
  feedHelpLine2: 'Mit "Neue Notiz" erstellen Sie eine mit dieser Base verknüpfte Notiz.',
  compactHelpLine1: "Schalten Sie Kompakt um, um zwischen den beiden Layouts zu wechseln.",
  compactHelpLine2: "Klicken Sie auf eine Karte, um ihre Notiz zu öffnen.",
  timelineHelpLine1: "Strg+Scrollen (oder Zoomgeste) zoomt, einfaches Scrollen verschiebt.",
  timelineHelpLine2: "Klicken Sie auf einen Balken oder eine Markierung, um die Notiz zu öffnen.",
  timelineHelpLine3: "Klicken Sie auf das Farbfeld einer Spur, um deren Farbe zu ändern.",
};

const fr: LocaleStrings = {
  newNoteButton: "Nouvelle note",
  createFailed: "Impossible de créer la note.",
  templateMissing: "Modèle introuvable : {path}",
  noteExists: "La note existe déjà : {path}",
  enableButtonName: 'Afficher le bouton « Nouvelle note »',
  enableButtonDesc:
    "Ajoute un bouton à la barre d'outils de la vue Feed qui crée une nouvelle note liée à la Base actuelle.",
  folderName: "Dossier des nouvelles notes",
  folderDesc: "Chemin relatif au coffre vers le dossier où enregistrer les nouvelles notes.",
  templateName: "Modèle",
  templateDesc: "Chemin relatif au coffre vers le fichier modèle utilisé pour les nouvelles notes.",
  showIconName: "Afficher l'icône du fichier",
  cardWidthName: "Largeur de la carte",
  showPropertiesName: "Afficher les propriétés",
  showMore: "Afficher plus",
  previewFailed: "(L'aperçu n'a pas pu être affiché.)",
  imagePropertyName: "Propriété d'image",
  imageFitName: "Ajustement de l'image",
  imageFitCoverLabel: "Couvrir",
  imageFitContainLabel: "Contenir",
  aspectRatioName: "Format de l'image",
  compactCardSettingsGroupName: "Paramètres des cartes compactes",
  compactToggleName: "Compact",
  timelineDatePropertyName: "Propriété de date",
  timelineEndDatePropertyName: "Propriété de date de fin",
  timelineGroupPropertyName: "Propriété de regroupement (lignes)",
  timelineLaneHeightName: "Hauteur de ligne",
  timelineEmptyState: "Aucune entrée à afficher dans la frise chronologique.",
  timelineTodayMarkerColorName: "Couleur du repère « aujourd'hui » de la frise",
  timelineTodayMarkerColorDesc:
    "Remplace la couleur par défaut (adaptée au thème) de la ligne verticale marquant la date du jour dans la vue Frise chronologique.",
  settingsIntro:
    "Ces paramètres s'appliquent globalement à chaque Base utilisant une vue Advanced Bases. Les options d'affichage propres à chaque Base — comme la largeur des cartes, l'ajustement de l'image ou la hauteur des lignes — se configurent séparément dans les paramètres de vue propres à chaque Base.",
  settingsFeedHeading: "Vue Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact n'a aucun paramètre global. Ses options d'affichage (mode compact, largeur de carte, ajustement de l'image, propriété d'image, affichage de l'icône) se configurent par Base — ouvrez une Base utilisant la vue Cards Compact et modifiez ses paramètres de vue dans le panneau latéral.",
  settingsTimelineHeading: "Vue Frise chronologique",
  helpAria: "Aide de la vue",
  feedHelpLine1: "Cliquez sur le titre d'une note pour l'ouvrir.",
  feedHelpLine2: "Utilisez « Nouvelle note » pour créer une note liée à cette Base.",
  compactHelpLine1: "Activez Compact pour basculer entre les deux dispositions.",
  compactHelpLine2: "Cliquez sur une carte pour ouvrir sa note.",
  timelineHelpLine1: "Ctrl+molette (ou pincement) pour zoomer, molette simple pour faire défiler.",
  timelineHelpLine2: "Cliquez sur une barre ou un repère pour ouvrir sa note.",
  timelineHelpLine3: "Cliquez sur la pastille de couleur d'une voie pour changer sa couleur.",
};

const es: LocaleStrings = {
  newNoteButton: "Nueva nota",
  createFailed: "No se pudo crear la nota.",
  templateMissing: "Plantilla no encontrada: {path}",
  noteExists: "La nota ya existe: {path}",
  enableButtonName: 'Mostrar botón "Nueva nota"',
  enableButtonDesc:
    "Añade un botón a la barra de la vista Feed que crea una nueva nota enlazada a la Base actual.",
  folderName: "Carpeta para notas nuevas",
  folderDesc: "Ruta relativa al vault de la carpeta donde se guardan las notas nuevas.",
  templateName: "Plantilla",
  templateDesc: "Ruta relativa al vault del archivo de plantilla usado para notas nuevas.",
  showIconName: "Mostrar icono del archivo",
  cardWidthName: "Ancho de la tarjeta",
  showPropertiesName: "Mostrar propiedades",
  showMore: "Mostrar más",
  previewFailed: "(No se pudo renderizar la vista previa.)",
  imagePropertyName: "Propiedad de imagen",
  imageFitName: "Ajuste de imagen",
  imageFitCoverLabel: "Cubrir",
  imageFitContainLabel: "Contener",
  aspectRatioName: "Relación de aspecto de la imagen",
  compactCardSettingsGroupName: "Ajustes de tarjetas compactas",
  compactToggleName: "Compacto",
  timelineDatePropertyName: "Propiedad de fecha",
  timelineEndDatePropertyName: "Propiedad de fecha de fin",
  timelineGroupPropertyName: "Propiedad de agrupación (carriles)",
  timelineLaneHeightName: "Altura del carril",
  timelineEmptyState: "No hay entradas para mostrar en la línea de tiempo.",
  timelineTodayMarkerColorName: "Color del marcador de hoy en la línea de tiempo",
  timelineTodayMarkerColorDesc:
    "Sustituye el color predeterminado (adaptado al tema) de la línea vertical que marca la fecha de hoy en la vista Línea de tiempo.",
  settingsIntro:
    "Estos ajustes se aplican globalmente a toda Base que use una vista de Advanced Bases. Las opciones de visualización propias de cada Base — como el ancho de tarjeta, el ajuste de imagen o la altura de carril — se configuran por separado en los ajustes de vista propios de cada Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact no tiene ajustes globales. Sus opciones de visualización (modo compacto, ancho de tarjeta, ajuste de imagen, propiedad de imagen, mostrar icono) se configuran por Base — abre una Base que use la vista Cards Compact y edita sus ajustes de vista en el panel lateral.",
  settingsTimelineHeading: "Vista Línea de tiempo",
  helpAria: "Ayuda de la vista",
  feedHelpLine1: "Haz clic en el título de una nota para abrirla.",
  feedHelpLine2: "Usa «Nueva nota» para crear una nota vinculada a esta Base.",
  compactHelpLine1: "Activa Compacto para alternar entre los dos diseños.",
  compactHelpLine2: "Haz clic en una tarjeta para abrir su nota.",
  timelineHelpLine1: "Ctrl+rueda (o pellizco) para hacer zoom; rueda normal para desplazar.",
  timelineHelpLine2: "Haz clic en una barra o marcador para abrir su nota.",
  timelineHelpLine3: "Haz clic en la muestra de color de un carril para cambiar su color.",
};

const it: LocaleStrings = {
  newNoteButton: "Nuova nota",
  createFailed: "Impossibile creare la nota.",
  templateMissing: "Modello non trovato: {path}",
  noteExists: "La nota esiste già: {path}",
  enableButtonName: 'Mostra il pulsante "Nuova nota"',
  enableButtonDesc:
    "Aggiunge un pulsante alla barra della vista Feed che crea una nuova nota collegata alla Base corrente.",
  folderName: "Cartella per le nuove note",
  folderDesc: "Percorso relativo al vault della cartella in cui salvare le nuove note.",
  templateName: "Modello",
  templateDesc: "Percorso relativo al vault del file modello usato per le nuove note.",
  showIconName: "Mostra icona del file",
  cardWidthName: "Larghezza scheda",
  showPropertiesName: "Mostra proprietà",
  showMore: "Mostra altro",
  previewFailed: "(Impossibile visualizzare l'anteprima.)",
  imagePropertyName: "Proprietà immagine",
  imageFitName: "Adattamento immagine",
  imageFitCoverLabel: "Copertura",
  imageFitContainLabel: "Contenuta",
  aspectRatioName: "Proporzioni immagine",
  compactCardSettingsGroupName: "Impostazioni schede compatte",
  compactToggleName: "Compatto",
  timelineDatePropertyName: "Proprietà data",
  timelineEndDatePropertyName: "Proprietà data di fine",
  timelineGroupPropertyName: "Proprietà di raggruppamento (corsie)",
  timelineLaneHeightName: "Altezza corsia",
  timelineEmptyState: "Nessuna voce da mostrare nella timeline.",
  timelineTodayMarkerColorName: "Colore del indicatore di oggi nella timeline",
  timelineTodayMarkerColorDesc:
    "Sostituisce il colore predefinito (adattato al tema) della linea verticale che indica la data odierna nella vista Timeline.",
  settingsIntro:
    "Queste impostazioni si applicano globalmente a ogni Base che usa una vista di Advanced Bases. Le opzioni di visualizzazione specifiche di ogni Base — come larghezza scheda, adattamento immagine o altezza corsia — si configurano separatamente nelle impostazioni di vista di ciascuna Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact non ha impostazioni globali. Le sue opzioni di visualizzazione (modalità compatta, larghezza scheda, adattamento immagine, proprietà immagine, mostra icona) si configurano per singola Base — apri una Base che usa la vista Cards Compact e modifica le sue impostazioni di vista nel pannello laterale.",
  settingsTimelineHeading: "Vista Timeline",
  helpAria: "Guida della vista",
  feedHelpLine1: "Fai clic sul titolo di una nota per aprirla.",
  feedHelpLine2: 'Usa "Nuova nota" per creare una nota collegata a questa Base.',
  compactHelpLine1: "Attiva Compatto per passare tra i due layout.",
  compactHelpLine2: "Fai clic su una scheda per aprire la sua nota.",
  timelineHelpLine1: "Ctrl+rotellina (o pizzico) per lo zoom, rotellina semplice per scorrere.",
  timelineHelpLine2: "Fai clic su una barra o un indicatore per aprire la sua nota.",
  timelineHelpLine3: "Fai clic sul campione di colore di una corsia per cambiarne il colore.",
};

const pt: LocaleStrings = {
  newNoteButton: "Nova nota",
  createFailed: "Não foi possível criar a nota.",
  templateMissing: "Modelo não encontrado: {path}",
  noteExists: "A nota já existe: {path}",
  enableButtonName: 'Mostrar botão "Nova nota"',
  enableButtonDesc:
    "Adiciona um botão à barra da vista Feed que cria uma nova nota vinculada à Base atual.",
  folderName: "Pasta para novas notas",
  folderDesc: "Caminho relativo ao cofre da pasta onde as novas notas são salvas.",
  templateName: "Modelo",
  templateDesc: "Caminho relativo ao cofre do arquivo de modelo usado para novas notas.",
  showIconName: "Mostrar ícone do arquivo",
  cardWidthName: "Largura do cartão",
  showPropertiesName: "Mostrar propriedades",
  showMore: "Mostrar mais",
  previewFailed: "(Não foi possível renderizar a pré-visualização.)",
  imagePropertyName: "Propriedade da imagem",
  imageFitName: "Ajuste da imagem",
  imageFitCoverLabel: "Cobrir",
  imageFitContainLabel: "Conter",
  aspectRatioName: "Proporção da imagem",
  compactCardSettingsGroupName: "Configurações de cartões compactos",
  compactToggleName: "Compacto",
  timelineDatePropertyName: "Propriedade de data",
  timelineEndDatePropertyName: "Propriedade de data de término",
  timelineGroupPropertyName: "Propriedade de agrupamento (raias)",
  timelineLaneHeightName: "Altura da raia",
  timelineEmptyState: "Nenhuma entrada para mostrar na linha do tempo.",
  timelineTodayMarkerColorName: "Cor do marcador de hoje na linha do tempo",
  timelineTodayMarkerColorDesc:
    "Substitui a cor padrão (adaptada ao tema) da linha vertical que marca a data de hoje na vista Linha do tempo.",
  settingsIntro:
    "Estas configurações aplicam-se globalmente a toda Base que use uma vista do Advanced Bases. As opções de exibição próprias de cada Base — como largura do cartão, ajuste da imagem ou altura da raia — são configuradas separadamente nas configurações de vista de cada Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "Cards Compact não tem configurações globais. Suas opções de exibição (modo compacto, largura do cartão, ajuste da imagem, propriedade da imagem, mostrar ícone) são configuradas por Base — abra uma Base que use a vista Cards Compact e edite suas configurações de vista na barra lateral.",
  settingsTimelineHeading: "Vista Linha do tempo",
  helpAria: "Ajuda da visualização",
  feedHelpLine1: "Clique no título de uma nota para abri-la.",
  feedHelpLine2: 'Use "Nova nota" para criar uma nota vinculada a esta Base.',
  compactHelpLine1: "Ative Compacto para alternar entre os dois layouts.",
  compactHelpLine2: "Clique em um cartão para abrir sua nota.",
  timelineHelpLine1: "Ctrl+rolagem (ou pinça) para ampliar, rolagem simples para deslocar.",
  timelineHelpLine2: "Clique em uma barra ou marcador para abrir sua nota.",
  timelineHelpLine3: "Clique na amostra de cor de uma faixa para alterar sua cor.",
};

const ru: LocaleStrings = {
  newNoteButton: "Новая заметка",
  createFailed: "Не удалось создать заметку.",
  templateMissing: "Шаблон не найден: {path}",
  noteExists: "Заметка уже существует: {path}",
  enableButtonName: 'Показать кнопку «Новая заметка»',
  enableButtonDesc:
    "Добавляет на панель вида Feed кнопку, создающую новую заметку, связанную с текущей Base.",
  folderName: "Папка для новых заметок",
  folderDesc: "Путь внутри хранилища к папке для новых заметок.",
  templateName: "Шаблон",
  templateDesc: "Путь внутри хранилища к файлу шаблона для новых заметок.",
  showIconName: "Показывать значок файла",
  cardWidthName: "Ширина карточки",
  showPropertiesName: "Показывать свойства",
  showMore: "Показать больше",
  previewFailed: "(Не удалось отобразить превью.)",
  imagePropertyName: "Свойство изображения",
  imageFitName: "Подгонка изображения",
  imageFitCoverLabel: "Заполнить",
  imageFitContainLabel: "Вместить",
  aspectRatioName: "Соотношение сторон изображения",
  compactCardSettingsGroupName: "Настройки компактных карточек",
  compactToggleName: "Компактный",
  timelineDatePropertyName: "Свойство даты",
  timelineEndDatePropertyName: "Свойство даты окончания",
  timelineGroupPropertyName: "Свойство группировки (дорожки)",
  timelineLaneHeightName: "Высота дорожки",
  timelineEmptyState: "Нет записей для отображения на шкале времени.",
  timelineTodayMarkerColorName: "Цвет отметки сегодняшнего дня на шкале времени",
  timelineTodayMarkerColorDesc:
    "Переопределяет цвет по умолчанию (адаптивный к теме) вертикальной линии, отмечающей сегодняшнюю дату в виде Шкала времени.",
  settingsIntro:
    "Эти настройки применяются глобально ко всем Base, использующим вид Advanced Bases. Параметры отображения для конкретной Base — например, ширина карточки, подгонка изображения или высота дорожки — настраиваются отдельно в собственных настройках вида каждой Base.",
  settingsFeedHeading: "Вид Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc:
    "У Cards Compact нет глобальных настроек. Параметры отображения (компактный режим, ширина карточки, подгонка изображения, свойство изображения, показ значка) настраиваются для каждой Base отдельно — откройте Base с видом Cards Compact и измените его настройки вида на боковой панели.",
  settingsTimelineHeading: "Вид Шкала времени",
  helpAria: "Справка по виду",
  feedHelpLine1: "Нажмите на заголовок заметки, чтобы открыть её.",
  feedHelpLine2: "Используйте «Новая заметка», чтобы создать заметку, связанную с этой Базой.",
  compactHelpLine1: "Включите Компактный, чтобы переключаться между двумя макетами.",
  compactHelpLine2: "Нажмите на карточку, чтобы открыть её заметку.",
  timelineHelpLine1: "Ctrl+колесо (или щипок) — масштаб, обычная прокрутка — панорамирование.",
  timelineHelpLine2: "Нажмите на полосу или метку, чтобы открыть заметку.",
  timelineHelpLine3: "Нажмите на цветовой образец дорожки, чтобы изменить её цвет.",
};

const ja: LocaleStrings = {
  newNoteButton: "新規ノート",
  createFailed: "ノートを作成できませんでした。",
  templateMissing: "テンプレートが見つかりません: {path}",
  noteExists: "ノートは既に存在します: {path}",
  enableButtonName: "「新規ノート」ボタンを表示",
  enableButtonDesc: "Feedビューのツールバーに、現在のBaseにリンクした新規ノートを作成するボタンを追加します。",
  folderName: "新規ノートのフォルダ",
  folderDesc: "新規ノートを保存するフォルダの Vault 内相対パス。",
  templateName: "テンプレート",
  templateDesc: "新規ノートに使用するテンプレートファイルの Vault 内相対パス。",
  showIconName: "ファイルアイコンを表示",
  cardWidthName: "カードの幅",
  showPropertiesName: "プロパティを表示",
  showMore: "もっと見る",
  previewFailed: "（プレビューを表示できませんでした。）",
  imagePropertyName: "画像プロパティ",
  imageFitName: "画像のフィット",
  imageFitCoverLabel: "カバー",
  imageFitContainLabel: "コンテイン",
  aspectRatioName: "画像のアスペクト比",
  compactCardSettingsGroupName: "コンパクトカードの設定",
  compactToggleName: "コンパクト",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "ビューのヘルプ",
  feedHelpLine1: "ノートのタイトルをクリックすると開きます。",
  feedHelpLine2: "「新規ノート」でこのBaseにリンクしたノートを作成します。",
  compactHelpLine1: "コンパクトを切り替えると2つのレイアウトを切り替えられます。",
  compactHelpLine2: "カードをクリックするとそのノートが開きます。",
  timelineHelpLine1: "Ctrl+スクロール（またはピンチ）でズーム、通常のスクロールでパンします。",
  timelineHelpLine2: "バーやマーカーをクリックするとノートが開きます。",
  timelineHelpLine3: "レーンのカラースウォッチをクリックすると色を変更できます。",
};

const zh: LocaleStrings = {
  newNoteButton: "新建笔记",
  createFailed: "无法创建笔记。",
  templateMissing: "找不到模板：{path}",
  noteExists: "笔记已存在：{path}",
  enableButtonName: "显示“新建笔记”按钮",
  enableButtonDesc: "在 Feed 视图工具栏中添加一个按钮，用于创建与当前 Base 关联的新笔记。",
  folderName: "新笔记文件夹",
  folderDesc: "保存新笔记的文件夹（相对于库根目录的路径）。",
  templateName: "模板",
  templateDesc: "新笔记使用的模板文件路径（相对于库根目录）。",
  showIconName: "显示文件图标",
  cardWidthName: "卡片宽度",
  showPropertiesName: "显示属性",
  showMore: "显示更多",
  previewFailed: "（预览渲染失败。）",
  imagePropertyName: "图片属性",
  imageFitName: "图片适配方式",
  imageFitCoverLabel: "填充",
  imageFitContainLabel: "包含",
  aspectRatioName: "图片宽高比",
  compactCardSettingsGroupName: "紧凑卡片设置",
  compactToggleName: "紧凑",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "视图帮助",
  feedHelpLine1: "点击笔记标题即可打开。",
  feedHelpLine2: "使用“新建笔记”创建与此 Base 关联的笔记。",
  compactHelpLine1: "切换“紧凑”即可在两种布局间切换。",
  compactHelpLine2: "点击卡片即可打开其笔记。",
  timelineHelpLine1: "Ctrl+滚轮（或双指缩放）可缩放，普通滚动可平移。",
  timelineHelpLine2: "点击条形或标记即可打开其笔记。",
  timelineHelpLine3: "点击泳道的颜色色块即可更改其颜色。",
};

const pl: LocaleStrings = {
  newNoteButton: "Nowa notatka",
  createFailed: "Nie udało się utworzyć notatki.",
  templateMissing: "Nie znaleziono szablonu: {path}",
  noteExists: "Notatka już istnieje: {path}",
  enableButtonName: 'Pokaż przycisk "Nowa notatka"',
  enableButtonDesc:
    "Dodaje do paska narzędzi widoku Feed przycisk tworzący nową notatkę powiązaną z bieżącą Base.",
  folderName: "Folder na nowe notatki",
  folderDesc: "Ścieżka względem magazynu do folderu, w którym zapisywane są nowe notatki.",
  templateName: "Szablon",
  templateDesc: "Ścieżka względem magazynu do pliku szablonu używanego dla nowych notatek.",
  showIconName: "Pokaż ikonę pliku",
  cardWidthName: "Szerokość karty",
  showPropertiesName: "Pokaż właściwości",
  showMore: "Pokaż więcej",
  previewFailed: "(Nie udało się wyrenderować podglądu.)",
  imagePropertyName: "Właściwość obrazu",
  imageFitName: "Dopasowanie obrazu",
  imageFitCoverLabel: "Wypełnij",
  imageFitContainLabel: "Zmieść",
  aspectRatioName: "Proporcje obrazu",
  compactCardSettingsGroupName: "Ustawienia kompaktowych kart",
  compactToggleName: "Kompaktowy",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Pomoc widoku",
  feedHelpLine1: "Kliknij tytuł notatki, aby ją otworzyć.",
  feedHelpLine2: "Użyj „Nowa notatka”, aby utworzyć notatkę powiązaną z tą Bazą.",
  compactHelpLine1: "Włącz Kompaktowy, aby przełączać się między dwoma układami.",
  compactHelpLine2: "Kliknij kartę, aby otworzyć jej notatkę.",
  timelineHelpLine1: "Ctrl+kółko (lub uszczypnięcie) przybliża, zwykłe przewijanie przesuwa.",
  timelineHelpLine2: "Kliknij pasek lub znacznik, aby otworzyć jego notatkę.",
  timelineHelpLine3: "Kliknij próbkę koloru pasa, aby zmienić jego kolor.",
};

const uk: LocaleStrings = {
  newNoteButton: "Нова нотатка",
  createFailed: "Не вдалося створити нотатку.",
  templateMissing: "Шаблон не знайдено: {path}",
  noteExists: "Нотатка вже існує: {path}",
  enableButtonName: "Показати кнопку «Нова нотатка»",
  enableButtonDesc:
    "Додає на панель інструментів вигляду Feed кнопку, яка створює нову нотатку, пов'язану з поточною Base.",
  folderName: "Папка для нових нотаток",
  folderDesc: "Шлях у сховищі до папки, куди зберігаються нові нотатки.",
  templateName: "Шаблон",
  templateDesc: "Шлях у сховищі до файлу шаблону, що використовується для нових нотаток.",
  showIconName: "Показувати значок файлу",
  cardWidthName: "Ширина картки",
  showPropertiesName: "Показувати властивості",
  showMore: "Показати більше",
  previewFailed: "(Не вдалося відобразити попередній перегляд.)",
  imagePropertyName: "Властивість зображення",
  imageFitName: "Підгонка зображення",
  imageFitCoverLabel: "Заповнити",
  imageFitContainLabel: "Вмістити",
  aspectRatioName: "Співвідношення сторін зображення",
  compactCardSettingsGroupName: "Налаштування компактних карток",
  compactToggleName: "Компактний",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Довідка перегляду",
  feedHelpLine1: "Натисніть на заголовок нотатки, щоб відкрити її.",
  feedHelpLine2: "Скористайтеся «Нова нотатка», щоб створити нотатку, пов'язану з цією Базою.",
  compactHelpLine1: "Увімкніть Компактний, щоб перемикатися між двома макетами.",
  compactHelpLine2: "Натисніть на картку, щоб відкрити її нотатку.",
  timelineHelpLine1: "Ctrl+колесо (або щипок) — масштабування, звичайна прокрутка — панорамування.",
  timelineHelpLine2: "Натисніть на смугу або мітку, щоб відкрити нотатку.",
  timelineHelpLine3: "Натисніть на зразок кольору доріжки, щоб змінити її колір.",
};

const nl: LocaleStrings = {
  newNoteButton: "Nieuwe notitie",
  createFailed: "Kan de notitie niet aanmaken.",
  templateMissing: "Sjabloon niet gevonden: {path}",
  noteExists: "Notitie bestaat al: {path}",
  enableButtonName: 'Toon knop "Nieuwe notitie"',
  enableButtonDesc:
    "Voegt een knop toe aan de werkbalk van de Feed-weergave waarmee een nieuwe notitie wordt gemaakt, gekoppeld aan de huidige Base.",
  folderName: "Map voor nieuwe notities",
  folderDesc: "Kluis-relatief pad naar de map waarin nieuwe notities worden opgeslagen.",
  templateName: "Sjabloon",
  templateDesc: "Kluis-relatief pad naar het sjabloonbestand voor nieuwe notities.",
  showIconName: "Bestandspictogram tonen",
  cardWidthName: "Kaartbreedte",
  showPropertiesName: "Eigenschappen tonen",
  showMore: "Meer tonen",
  previewFailed: "(Voorbeeld kon niet worden weergegeven.)",
  imagePropertyName: "Afbeeldingseigenschap",
  imageFitName: "Afbeelding aanpassen",
  imageFitCoverLabel: "Vullen",
  imageFitContainLabel: "Passend",
  aspectRatioName: "Beeldverhouding afbeelding",
  compactCardSettingsGroupName: "Instellingen voor compacte kaarten",
  compactToggleName: "Compact",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Weergavehulp",
  feedHelpLine1: "Klik op de titel van een notitie om deze te openen.",
  feedHelpLine2: 'Gebruik "Nieuwe notitie" om een notitie te maken die is gekoppeld aan deze Base.',
  compactHelpLine1: "Schakel Compact in om tussen de twee lay-outs te wisselen.",
  compactHelpLine2: "Klik op een kaart om de bijbehorende notitie te openen.",
  timelineHelpLine1: "Ctrl+scrollen (of knijpen) zoomt, gewoon scrollen verschuift.",
  timelineHelpLine2: "Klik op een balk of markering om de notitie te openen.",
  timelineHelpLine3: "Klik op het kleurstaal van een baan om de kleur te wijzigen.",
};

const tr: LocaleStrings = {
  newNoteButton: "Yeni not",
  createFailed: "Not oluşturulamadı.",
  templateMissing: "Şablon bulunamadı: {path}",
  noteExists: "Not zaten var: {path}",
  enableButtonName: '"Yeni not" düğmesini göster',
  enableButtonDesc:
    "Feed görünümü araç çubuğuna, geçerli Base ile ilişkili yeni bir not oluşturan bir düğme ekler.",
  folderName: "Yeni notlar için klasör",
  folderDesc: "Yeni notların kaydedileceği klasörün kasaya göreli yolu.",
  templateName: "Şablon",
  templateDesc: "Yeni notlar için kullanılan şablon dosyasının kasaya göreli yolu.",
  showIconName: "Dosya simgesini göster",
  cardWidthName: "Kart genişliği",
  showPropertiesName: "Özellikleri göster",
  showMore: "Daha fazla göster",
  previewFailed: "(Önizleme oluşturulamadı.)",
  imagePropertyName: "Görsel özelliği",
  imageFitName: "Görsel sığdırma",
  imageFitCoverLabel: "Kapla",
  imageFitContainLabel: "Sığdır",
  aspectRatioName: "Görsel en boy oranı",
  // flagged fallback: no fluent Turkish reviewer at authoring time, translated
  // via careful literal construction rather than idiom; follow-up: native review.
  compactCardSettingsGroupName: "Kompakt kart ayarları",
  compactToggleName: "Kompakt",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Görünüm yardımı",
  feedHelpLine1: "Açmak için bir notun başlığına tıklayın.",
  feedHelpLine2: 'Bu Base\'e bağlı bir not oluşturmak için "Yeni not"u kullanın.',
  compactHelpLine1: "İki düzen arasında geçiş yapmak için Kompakt'ı açın.",
  compactHelpLine2: "Notunu açmak için bir karta tıklayın.",
  timelineHelpLine1: "Yakınlaştırmak için Ctrl+kaydırma (veya sıkıştırma), kaydırmak için düz kaydırma.",
  timelineHelpLine2: "Notunu açmak için bir çubuğa veya işarete tıklayın.",
  timelineHelpLine3: "Rengini değiştirmek için bir şeridin renk örneğine tıklayın.",
};

const ko: LocaleStrings = {
  newNoteButton: "새 노트",
  createFailed: "노트를 만들 수 없습니다.",
  templateMissing: "템플릿을 찾을 수 없습니다: {path}",
  noteExists: "노트가 이미 존재합니다: {path}",
  enableButtonName: '"새 노트" 버튼 표시',
  enableButtonDesc: "현재 Base에 연결된 새 노트를 만드는 버튼을 Feed 보기 툴바에 추가합니다.",
  folderName: "새 노트 폴더",
  folderDesc: "새 노트를 저장할 폴더의 볼트 상대 경로.",
  templateName: "템플릿",
  templateDesc: "새 노트에 사용할 템플릿 파일의 볼트 상대 경로.",
  showIconName: "파일 아이콘 표시",
  cardWidthName: "카드 너비",
  showPropertiesName: "속성 표시",
  showMore: "더 보기",
  previewFailed: "(미리보기를 표시할 수 없습니다.)",
  imagePropertyName: "이미지 속성",
  imageFitName: "이미지 맞춤",
  imageFitCoverLabel: "채우기",
  imageFitContainLabel: "포함",
  aspectRatioName: "이미지 가로세로 비율",
  compactCardSettingsGroupName: "컴팩트 카드 설정",
  compactToggleName: "컴팩트",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc:
    "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro:
    "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options — like card size, image fit, or lane height — are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc:
    "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base — open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "보기 도움말",
  feedHelpLine1: "노트 제목을 클릭하면 열립니다.",
  feedHelpLine2: '"새 노트"를 사용해 이 Base에 연결된 노트를 만듭니다.',
  compactHelpLine1: "컴팩트를 켜면 두 레이아웃을 전환할 수 있습니다.",
  compactHelpLine2: "카드를 클릭하면 해당 노트가 열립니다.",
  timelineHelpLine1: "Ctrl+스크롤(또는 핀치)로 확대/축소, 일반 스크롤로 이동합니다.",
  timelineHelpLine2: "막대나 마커를 클릭하면 노트가 열립니다.",
  timelineHelpLine3: "레인의 색상 견본을 클릭하면 색상을 변경할 수 있습니다.",
};

const LOCALES: Record<string, LocaleStrings> = {
  en,
  cs,
  de,
  fr,
  es,
  it,
  pt,
  ru,
  ja,
  zh,
  pl,
  uk,
  nl,
  tr,
  ko,
};

/**
 * Resolves a raw Obsidian language code (as stored in localStorage, e.g.
 * "en", "zh-CN", "pt-BR") to one of our supported locale keys, falling back
 * to the base language and finally English. Pure function, no DOM access,
 * so it stays unit-testable.
 */
export function resolveLocale(raw: string | null | undefined): string {
  const normalized = (raw || "en").toLowerCase();
  if (LOCALES[normalized]) return normalized;
  const base = normalized.split("-")[0];
  if (LOCALES[base]) return base;
  return "en";
}

function detectRawLanguage(): string | null {
  try {
    return getLanguage();
  } catch {
    return null;
  }
}

export function getStrings(): LocaleStrings {
  return LOCALES[resolveLocale(detectRawLanguage())] ?? en;
}

export function format(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(`{${key}}`, value);
  }
  return out;
}
