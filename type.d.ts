/**
 * Interface représentant un document Google Docs. 
 */
export default interface Document {
  title: string; // nom du document
  revisionId: string; // id unique de la dernière version
  suggestionsViewMode: any; //TODO Define this type properly
  documentId: string; // L'ID unique du document dans Google Drive.
  tabs: tabsObject[]; // 	Contient le contenu du document (onglets, corps, en-têtes, pieds de page).
  body: Body;
  headers: Record<string, Header>; // En-têtes personnalisés (par défaut ou spécifiques à la première page).
  footers: Record<string, Footer>; // Pieds de page personnalisés (par défaut ou spécifiques à la première page).
  footnotes: Record<string, FootNote>; // Notes de bas de page référencées dans le texte.
  documentStyle: DocumentStyle; // Définit la mise en page globale (marges, taille de page, en-têtes/pieds de page par défaut).

  suggestedDocumentStyleChanges: Record<string, any>; // TODO: Define this type properly
  namedStyles: NamedStyles; // Contient les styles prédéfinis (titres, texte normal, etc.).
  suggestedNamedStylesChanges: Record<string, any>; // TODO: Define this type properly
  lists: Record<string, List>; // Contient les listes définies dans le document.
  namedRanges: Record<string, NamedRanges>; // Contient les plages nommées dans le document.
  inlineObjects: Record<string, inlineObject>; // Contient les objets en ligne (images, dessins, etc.).
  positionedObjects: Record<string, PositionedObject>; // Contient les objets positionnés (images, dessins, etc.) avec des propriétés de positionnement.
}

/**Export de tous les types/interfaces. */
export {
  tabsObject,
  Body,
  Header,
  Footer,
  FootNote,
  PositionedObject,
  PositionedObjectProperties,
  PositionedObjectPositioning,
  PositionedObjectLayout,
  inlineObject,
  InlineObjectProperties,
  EmbeddedObject,
  EmbeddedObjectBase,
  ImageProperties,
  CropProperties,
  EmbeddedDrawingProperties,
  LinkedContentReference,
  SheetsChartReference,
  EmbeddedObjectBorder,
  PropertyState,
  List,
  ListProperties,
  NestingLevel,
  GlyphType,
  BulletAlignment,
  NamedRanges,
  NamedRange,
  Range,
  DocumentStyle,
  paragraph,
  sectionBreak,
  table,
  inlineObjectElement,
  horizontalRule,
  tableOfContents,
};



interface tabsObject {
  tabProperties: {
    tabId: string; // Uniquement en sortie. ID de l'onglet. Ce champ ne peut pas être modifié.
    title: string; // Nom visible par l'utilisateur de l'onglet.
    parentTabId?: string; // Facultatif. ID de l'onglet parent. Vide lorsque l'onglet actuel est un onglet de niveau racine, ce qui signifie qu'il n'a pas de parents.
    index: number; // Index basé sur zéro de l'onglet dans le parent.
    nestingLevel: number; // Uniquement en sortie. Profondeur de l'onglet dans le document. Les onglets de niveau racine commencent à 0.
  };
  childTabs: tabsObject[]; // recusrsivement, pour les sous-onglets.
  documentTab: {
    body: Body; // Contenu principal du document (paragraphes, sauts de section, tableaux).
    header?: Record<string, Header>; // En-têtes personnalisés (par défaut ou spécifiques à la première page).
    footers?: Record<string, Footer>; // Pieds de page personnalisés (par défaut ou spécifiques à la première page).
    footnotes?: Record<string, FootNote>; //Notes de bas de page référencées dans le texte.
    documentStyle: DocumentStyle;
    suggestedDocumentStyleChanges: Record<string, any>; // TODO: Define this type properly
    namedStyles: NamedStyles;
    suggestedNamedStylesChanges: Record<string, any>; //TODO: Define this type properly
    lists: Record<string, List>;
    namedRanges: Record<string, NamedRanges>; // Contient les plages nommées dans le document.
    inlineObjects: Record<string, inlineObject>;
    positionedObjects: Record<string, PositionedObject>;
  };
}

interface Body {
  content: StructuralElement[];
}

interface Header {
  headerId: string;
  content: StructuralElement[]; // Liste des éléments de structure dans l'en-tête.
}

interface Footer {
  footerId: string;
  content: StructuralElement[];
}

interface FootNote {
  footnoteId: string;
  content: StructuralElement[];
}

interface PositionedObject {
  objectId: string;
  positionedObjectProperties: PositionedObjectProperties;
  suggestedPositionedObjectPropertiesChanges: Record<string, any>; // TODO: Define this type properly
  suggestedInsertionId: string;
  suggestedDeletionIds: string[];
}

interface PositionedObjectProperties {
  positioning: PositionedObjectPositioning;
  embeddedObject: EmbeddedObject;
}

interface PositionedObjectPositioning {
  layout: PositionedObjectLayout;
  leftOffset: Dimension;
  topOffset: Dimension;
}

/**
 * Enum for the layout of positioned objects in Google Docs.
 */
type PositionedObjectLayout =
  | "POSITIONED_OBJECT_LAYOUT_UNSPECIFIED"
  | "WRAP_TEXT"
  | "BREAK_LEFT"
  | "BREAK_RIGHT"
  | "BREAK_LEFT_RIGHT"
  | "IN_FRONT_OF_TEXT"
  | "BEHIND_TEXT";

interface inlineObject {
  objectId: string;
  inlineObjectProperties: InlineObjectProperties;
  suggestedInlineObjectPropertiesChanges: Record<string, any>; // TODO: Define this type properly
  suggestedInsertionId: string;
  suggestedDeletionIds: [string];
}

interface InlineObjectProperties {
  embeddedObject: EmbeddedObject;
}

type EmbeddedObject =
  | (EmbeddedObjectBase & {
      embeddedDrawingProperties: EmbeddedDrawingProperties;
    })
  | (EmbeddedObjectBase & { imageProperties: ImageProperties });

interface EmbeddedObjectBase {
  title: string;
  description: string;
  embeddedObjectBorder: EmbeddedObjectBorder;
  size: Size;
  marginTop: Dimension;
  marginBottom: Dimension;
  marginRight: Dimension;
  marginLeft: Dimension;
  linkedContentReference: LinkedContentReference;
}

interface ImageProperties {
  contentUri: string;
  sourceUri: string;
  brightness: number;
  contrast: number;
  transparency: number;
  cropProperties: CropProperties;
  angle: number;
}

interface CropProperties {
  offsetLeft: number;
  offsetRight: number;
  offsetTop: number;
  offsetBottom: number;
  angle: number;
}

/**
 * Ce type ne comporte aucun champ.
 *
 * Propriétés d'un dessin intégré et utilisées pour différencier le type d'objet. Un dessin intégré est un dessin créé et modifié dans un document. Notez que les détails détaillés ne sont pas acceptés.
 */
interface EmbeddedDrawingProperties {}

interface LinkedContentReference {
  // Union field reference can be only one of the following:
  sheetsChartReference: SheetsChartReference;

  // End of list of possible types for union field reference.
}

interface SheetsChartReference {
  spreadsheetId: string;
  chartId: number;
}

interface EmbeddedObjectBorder {
  color: OptionalColor;
  width: Dimension;
  dashStyle: DashStyle;
  propertyState: PropertyState;
}

/**
 * Enum for the state of properties in Google Docs.
 */
type PropertyState = "RENDERED" | "NOT_RENDERED";

interface List {
  listProperties: ListProperties;
  suggestedListPropertiesChanges: Record<string, any>; // TODO: Define this type properly
  suggestedInsertionId: string;
  suggestedDeletionIds: string[];
}

interface ListProperties {
  nestingLevels: NestingLevel[];
}

interface NestingLevel {
  bulletAlignment: BulletAlignment;
  glyphFormat: string;
  indentFirstLine: Dimension;
  indentStart: Dimension;
  textStyle: TextStyle;
  startNumber: number;

  // Union field glyph_kind can be only one of the following:
  glyphType: GlyphType;
  glyphSymbol: string;
  // End of list of possible types for union field glyph_kind.
}

type GlyphType =
  | "GLYPH_TYPE_UNSPECIFIED"
  | "NONE"
  | "DECIMAL"
  | "ZERO_DECIMAL"
  | "UPPER_ALPHA"
  | "ALPHA"
  | "UPPER_ROMAN"
  | "ROMAN";

/**
 * Enum
 */
type BulletAlignment =
  | "BULLET_ALIGNMENT_UNSPECIFIED"
  | "START"
  | "CENTER"
  | "END";

interface NamedRanges {
  name: string;
  namedRanges: NamedRange[];
}

interface NamedRange {
  namedRangeId: string;
  name: string;
  ranges: Range[];
}

interface Range {
  segmentId: string;
  startIndex: number;
  endIndex: number;
  tabId: string;
}

interface DocumentStyle {
  background: {
    color: OptionalColor; // Couleur de l'arrière-plan.
  };
  defaultHeaderId: string;
  defaultFooterId: string;
  evenPageHeaderId: string;
  evenPageFooterId: string;
  firstPageHeaderId: string;
  firstPageFooterId: string;
  useFirstPageHeaderFooter: boolean;
  useEvenPageHeaderFooter: boolean;
  pageNumberStart: number;
  marginTop: Dimension;
  marginBottom: Dimension;
  marginRight: Dimension;
  marginLeft: Dimension;
  pageSize: Size;
  marginHeader: Dimension;
  marginFooter: Dimension;
  useCustomHeaderFooterMargins: boolean; // Indique si les valeurs DocumentStyle marginHeader, SectionStyle marginHeader et DocumentStyle marginFooter, SectionStyle marginFooter sont respectées. Si la valeur est "false", les valeurs par défaut de l'éditeur Docs pour la marge d'en-tête et de pied de page sont utilisées. Cette propriété est en lecture seule.
  flipPageOrientation?: boolean;
}

interface paragraph {
  startIndex: number; // Position de début (inclusive)
  endIndex: number; // Position de fin (exclusive)
  paragraph: {};
}

interface sectionBreak {}
interface table {}
interface inlineObjectElement {}
interface horizontalRule {}
interface tableOfContents {}

//Utils

interface Header {
  headerId: string;
  content: StructuralElement[]; // Liste des éléments de structure dans l'en-tête.
}

interface StructuralElement {
  startIndex: number;
  endIndex: number;

  // Union field content can be only one of the following:
  paragraph: Paragraph;
  sectionBreak: SectionBreak;
  table: Table;
  tableOfContents: TableOfContents;

  // End of list of possible types for union field content.
}

interface TableOfContents {
  content: StructuralElement[];

  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
}

interface Table {
  rows: number;
  columns: number;
  tableRows: TableRow[];

  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  tableStyle: TableStyle;
}
interface TableStyle {
  tableColumnProperties: TableColumnProperties[];
}

interface TableColumnProperties {
  widthType: WidthType;
  width: Dimension;
}

/**
 * Enum for width types in Google Docs tables.
 */
type WidthType =
  | "WIDTH_TYPE_UNSPECIFIED"
  | "EVENLY_DISTRIBUTED"
  | "FIXED_WIDTH";
interface TableRow {
  startIndex: number;
  endIndex: number;
  tableCells: TableCell[];
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  //je suis ici
  tableRowStyle: TableRowStyle;
  suggestedTableRowStyleChanges: Record<string, any>; //TODO: Define this type properly
}
interface TableCell {
  startIndex: number;
  endIndex: number;
  content: StructuralElement[];
  tableCellStyle: TableCellStyle;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  suggestedTableCellStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface TableRowStyle {
  minRowHeight: Dimension;
  tableHeader: boolean;
  preventOverflow: boolean;
}

interface TableCellStyle {
  rowSpan: number;
  columnSpan: number;
  backgroundColor: OptionalColor;
  borderLeft: TableCellBorder;
  borderRight: TableCellBorder;
  borderTop: TableCellBorder;
  borderBottom: TableCellBorder;
  paddingLeft: Dimension;
  paddingRight: Dimension;
  paddingTop: Dimension;
  paddingBottom: Dimension;
  contentAlignment: ContentAlignment;
}

/**
 * Enum for content alignment in table cells.
 */
type ContentAlignment =
  | "CONTENT_ALIGNMENT_UNSPECIFIED"
  | "CONTENT_ALIGNMENT_UNSUPPORTED"
  | "TOP"
  | "MIDDLE"
  | "BOTTOM";

interface TableCellBorder {
  color: OptionalColor;
  width: Dimension;
  dashStyle: DashStyle;
}

interface SectionBreak {
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  sectionStyle: SectionStyle;
}

interface SectionStyle {
  columnProperties: SectionColumnProperties[];
  columnSeparatorStyle: ColumnSeparatorStyle;
  contentDirection: ContentDirection;
  marginTop: Dimension;
  marginBottom: Dimension;
  marginRight: Dimension;
  marginLeft: Dimension;
  marginHeader: Dimension;
  marginFooter: Dimension;
  sectionType: SectionType;
  defaultHeaderId: string;
  defaultFooterId: string;
  firstPageHeaderId: string;
  firstPageFooterId: string;
  evenPageHeaderId: string;
  evenPageFooterId: string;
  useFirstPageHeaderFooter: boolean;
  pageNumberStart: number;
  flipPageOrientation: boolean;
}

interface SectionColumnProperties {
  width: Dimension;
  paddingEnd: Dimension;
}

/**
 * Enum for section types in Google Docs.
 */
type SectionType = "SECTION_TYPE_UNSPECIFIED	" | "CONTINUOUS" | "NEXT_PAGE";

/**
 * Enum for column separator styles in Google Docs.
 */
type ColumnSeparatorStyle =
  | "COLUMN_SEPARATOR_STYLE_UNSPECIFIED"
  | "NONE"
  | "BETWEEN_EACH_COLUMN";

interface Paragraph {
  elements: ParagraphElement[];
  paragraphStyle: ParagraphStyle;
  suggestedParagraphStyleChanges: Record<string, any>; //TODO: Define this type properly
  bullet: Bullet;
  suggestedBulletChanges: Record<string, any>; //TODO: Define this type properly
  positionedObjectIds: string[];
  suggestedPositionedObjectIds: Record<string, any>; //TODO: Define this type properly
}

type ParagraphElement =
  | (BaseParagraphElement & { textRun: TextRun })
  | (BaseParagraphElement & { autoText: AutoText })
  | (BaseParagraphElement & { pageBreak: PageBreak })
  | (BaseParagraphElement & { columnBreak: ColumnBreak })
  | (BaseParagraphElement & { footnoteReference: FootnoteReference })
  | (BaseParagraphElement & { horizontalRule: HorizontalRule })
  | (BaseParagraphElement & { equation: Equation })
  | (BaseParagraphElement & { inlineObjectElement: InlineObjectElement })
  | (BaseParagraphElement & { person: Person })
  | (BaseParagraphElement & { richLink: RichLink });

interface BaseParagraphElement {
  startIndex: number;
  endIndex: number;
}

interface Bullet {
  listId: string;
  nestingLevel: number;
  textStyle: TextStyle;
}

interface TextRun {
  content: string;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface AutoText {
  type: Type;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface PageBreak {
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface ColumnBreak {
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface FootnoteReference {
  footnoteId: string;
  footnoteNumber: string;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface HorizontalRule {
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface Equation {
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
}

interface InlineObjectElement {
  inlineObjectId: string;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
}

interface Person {
  personId: string;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
  personProperties: PersonProperties;
}

interface PersonProperties {
  name: string;
  email: string;
}

interface RichLink {
  richLinkId: string;
  suggestedInsertionIds: string[];
  suggestedDeletionIds: string[];
  textStyle: TextStyle;
  suggestedTextStyleChanges: Record<string, any>; //TODO: Define this type properly
  richLinkProperties: RichLinkProperties;
}

interface RichLinkProperties {
  title: string;
  uri: string;
  mimeType: string;
}

/**
 * enum for types of AutoText in Google Docs.
 */
type Type = "TYPE_UNSPECIFIED" | "PAGE_NUMBER" | "PAGE_COUNT";

interface NamedStyles {
  styles: NamedStyle[];
}
interface NamedStyle {
  namedStyleType: NamedStyleType; // Type de style nommé (par exemple, NORMAL_TEXT, TITLE, etc.).
  textStyle: TextStyle;
  paragraphStyle: ParagraphStyle;
}

interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  smallCaps: boolean;
  backgroundColor: OptionalColor;
  foregroundColor: OptionalColor;
  fontSize: Dimension;
  weightedFontFamily: WeightedFontFamily;
  baselineOffset: BaselineOffset;
  link: Link;
}

type Link =
  | { url: string }
  | { tabId: string }
  | { bookmark: BookmarkLink }
  | { heading: HeadingLink }
  | { bookmarkId: string }
  | { headingId: string };

/**
 * Référence à un signet dans ce document.
 */
type BookmarkLink = {
  id: string;
  tabId: string;
};

/**
 * Référence à un titre de ce document.
 */
type HeadingLink = {
  id: string;
  tabId: string;
};

/**
 * @property {string} headingId -> ID de l'en-tête du paragraphe. Si ce champ est vide, ce paragraphe n'est pas un titre.
 */
interface ParagraphStyle {
  headingId: string; // ID de l'en-tête du paragraphe. Si ce champ est vide, ce paragraphe n'est pas un titre.
  namedStyleType: NamedStyleType;
  alignment: Alignment;
  lineSpacing: number;
  direction: ContentDirection;
  spacingMode: SpacingMode;
  spaceAbove: Dimension;
  spaceBelow: Dimension;
  borderBetween: ParagraphBorder;
  borderTop: ParagraphBorder;
  borderBottom: ParagraphBorder;
  borderLeft: ParagraphBorder;
  borderRight: ParagraphBorder;
  indentFirstLine: Dimension;
  indentStart: Dimension;
  indentEnd: Dimension;
  tabStops: TabStop[];
  keepLinesTogether: boolean;
  keepWithNext: boolean;
  avoidWidowAndOrphan: boolean;
  shading: Shading;
  pageBreakBefore: boolean;
}

interface TabStop {
  offset: Dimension;
  alignment: TabStopAlignment;
}

/**
 * Enum for tab stop alignments in Google Docs.
 */
type TabStopAlignment =
  | "TAB_STOP_ALIGNMENT_UNSPECIFIED"
  | "START"
  | "CENTER"
  | "END";

interface WeightedFontFamily {
  fontFamily: string;
  weight: number;
}

interface Shading {
  backgroundColor: OptionalColor;
}

interface ParagraphBorder {
  color: OptionalColor;
  width: Dimension;
  padding: Dimension;
  dashStyle: DashStyle;
}

/**
 * Enum for dash styles in paragraph borders.
 */
type DashStyle = "DASH_STYLE_UNSPECIFIED" | "SOLID" | "DOT" | "DASH";

/**
 * Enum for content direction in text styles.
 */
type Alignment =
  | "ALIGNMENT_UNSPECIFIED"
  | "START"
  | "CENTER"
  | "END"
  | "JUSTIFIED";

/**
 * Enum for spacing modes in paragraph styles.
 */
type SpacingMode =
  | "SPACING_MODE_UNSPECIFIED"
  | "NEVER_COLLAPSE"
  | "COLLAPSE_LISTS";

/**
 * Enum for spacing modes in paragraph styles.
 */
type ContentDirection =
  | "CONTENT_DIRECTION_UNSPECIFIED"
  | "LEFT_TO_RIGHT"
  | "RIGHT_TO_LEFT";

/**
 * Enum for baseline offsets in text styles.
 */
type BaselineOffset =
  | "BASELINE_OFFSET_UNSPECIFIED"
  | "NONE"
  | "SUPERSCRIPT"
  | "SUBSCRIPT";

/**
 * Enum for named style types in Google Docs.
 */
type NamedStyleType =
  | "NAMED_STYLE_TYPE_UNSPECIFIED"
  | "NORMAL_TEXT"
  | "TITLE"
  | "SUBTITLE"
  | "HEADING_1"
  | "HEADING_2"
  | "HEADING_3"
  | "HEADING_4"
  | "HEADING_5"
  | "HEADING_6";

interface Size {
  height: Dimension;
  width: Dimension;
}

interface Dimension {
  magnitude: number; // Valeur de la dimension.
  unit: "UNIT_UNSPECIFIED" | "PT"; // Unité de la dimension (par exemple, "PT" pour points).
}

interface OptionalColor {
  color: Color; // Si cette valeur est définie, elle sera utilisée comme couleur opaque. Si cette valeur n'est pas définie, elle représente une couleur transparente.
}

interface Color {
  rgbColor: RgbColor; // Valeur de couleur RVB.
}

interface RgbColor {
  red: number; //Composant rouge de la couleur, compris entre 0,0 et 1,0.
  green: number; // Composant vert de la couleur, compris entre 0,0 et 1,0.
  blue: number; // Composant bleu de la couleur, compris entre 0,0 et 1,0.
}
