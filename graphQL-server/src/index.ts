import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';

const typeDefs = `#graphql
type Breadcrumb {
  url: Url!
  title: String!
}

"""Language"""
type ConfigurableLanguage implements Entity & LanguageInterface {
  id: String
  name: String!
  direction: Int!
  weight: Int
  isLocked: Boolean!
}

type ContentPath {
  path: String!
  translations: [String!]
}

type DefaultEntityUrl implements Url & InternalUrl & EntityUrl {
  path: String!
  entity: Entity
  routeName: String!
  internalPath: String!
  breadcrumb: [Breadcrumb!]!
  languageSwitchLinks: [LanguageSwitchLink!]!
}

type DefaultInternalUrl implements Url & InternalUrl {
  path: String!
  internalPath: String!
  routeName: String!
  breadcrumb: [Breadcrumb!]!
  languageSwitchLinks: [LanguageSwitchLink!]!
}

type DefaultUrl implements Url {
  path: String
}

enum DrupalDateFormat {
  """14-11-2022 14:52"""
  EWCMS_ADMIN_PAGES

  """14-11-2022"""
  EWCMS_ADMIN_PAGES_DATE_ONLY

  """14-11-2022 14:52 (Europe/Brussels)"""
  EWCMS_ADMIN_PAGES_TIMEZONE

  """14 November 2022, 14:52 (CET)"""
  EWCMS_DATE_AND_TIME

  """14 Nov 2022"""
  EWCMS_SHORT_DATE

  """14 Nov 2022, 14:52"""
  EWCMS_SHORT_DATE_AND_TIME

  """14 Nov 2022, 14:52 (CET)"""
  EWCMS_SHORT_DATE_AND_TIME_TIMEZONE

  """14 November 2022"""
  EWCMS_SIMPLE_DATE

  """Monday 14 November 2022, 14:52 (CET)"""
  EWCMS_WEEKDAY_DATE_AND_TIME

  """Mon, 11/14/2022 - 14:52"""
  FALLBACK

  """2022-11-14"""
  HTML_DATE

  """2022-11-14T14:52:21+0100"""
  HTML_DATETIME

  """2022-11"""
  HTML_MONTH

  """14:52:21"""
  HTML_TIME

  """2022-W46"""
  HTML_WEEK

  """2022"""
  HTML_YEAR

  """11-14"""
  HTML_YEARLESS_DATE

  """Monday, November 14, 2022 - 14:52"""
  LONG

  """Mon, 11/14/2022 - 14:52"""
  MEDIUM

  """14 November 2022, 14:52 (CET)"""
  OE_CALL_PROPOSALS_DATE_FULL_TIMEZONE

  """14 November 2022"""
  OE_CALL_PROPOSALS_DATE_LONG

  """14 November 2022"""
  OE_CALL_PROPOSALS_TEASER_DATE

  """14 November 2022, 14:52 (CET)"""
  OE_CALL_TENDERS_DATE_FULL_TIMEZONE

  """14 November 2022"""
  OE_CALL_TENDERS_DATE_LONG

  """14 November 2022"""
  OE_CONSULTATION_DATE

  """14 November 2022, 14:52 (CET)"""
  OE_CONSULTATION_DATE_WITH_TIME_AND_TIMEZONE

  """14 November 2022"""
  OE_EVENT_DATE

  """14 November 2022, 14:52"""
  OE_EVENT_DATE_HOUR

  """14 November 2022, 14:52 CET"""
  OE_EVENT_DATE_HOUR_TIMEZONE

  """Monday 14 November 2022, 14:52"""
  OE_EVENT_LONG_DATE_HOUR

  """Monday 14 November 2022, 14:52 CET"""
  OE_EVENT_LONG_DATE_HOUR_TIMEZONE

  """14 Nov 2022"""
  OE_EVENT_PROGRAMME_DATE

  """14 Nov 2022, 02:52 PM"""
  OE_EVENT_PROGRAMME_DATE_HOUR

  """14 Nov 2022, 02:52 PM CET"""
  OE_EVENT_PROGRAMME_DATE_HOUR_TIMEZONE

  """02:52 PM"""
  OE_EVENT_PROGRAMME_HOUR

  """02:52 PM CET"""
  OE_EVENT_PROGRAMME_HOUR_TIMEZONE

  """14.11.2022"""
  OE_PROJECT_DATE

  """14 November 2022"""
  OE_THEME_NEWS_DATE

  """14 November 2022"""
  OE_THEME_PUBLICATION_DATE

  """11/14/2022 - 14:52"""
  SHORT
}

interface Entity {
  id: String
}

type EntityCanonicalUrl implements Url & InternalUrl & EntityUrl {
  path: String!
  entity: Entity
  routeName: String!
  internalPath: String!
  breadcrumb: [Breadcrumb!]!
  languageSwitchLinks: [LanguageSwitchLink!]!
}

"""An entity that has a description."""
interface EntityDescribable {
  """The description."""
  entityDescription: String
  id: String
}

"""An entity that is linkable."""
interface EntityLinkable {
  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url
}

enum EntityQueryBundleMode {
  """Loads entities across all bundles."""
  ALL

  """Loads only entities that share the same bundle with the parent entity."""
  SAME
}

enum EntityQueryConjunction {
  AND
  OR
}

input EntityQueryFilterConditionInput {
  enabled: Boolean
  field: String!
  language: String
  operator: EntityQueryOperator
  value: [String]
}

input EntityQueryFilterInput {
  conditions: [EntityQueryFilterConditionInput]
  conjunction: EntityQueryConjunction
  groups: [EntityQueryFilterInput]
}

enum EntityQueryOperator {
  BETWEEN
  EQUAL
  GREATER_THAN
  GREATER_THAN_OR_EQUAL
  IN
  IS_NOT_NULL
  IS_NULL
  LIKE
  NOT_BETWEEN
  NOT_EQUAL
  NOT_IN
  NOT_LIKE
  REGEXP
  SMALLER_THAN
  SMALLER_THAN_OR_EQUAL
}

type EntityQueryResult {
  total: Int!
  items: [Entity]
}

enum EntityQueryRevisionMode {
  """Loads all revisions."""
  ALL

  """Loads the current (default) revisions."""
  DEFAULT

  """Loads latest revision."""
  LATEST
}

input EntityQuerySortInput {
  direction: EntityQuerySortOrder
  field: String!
  language: String
}

enum EntityQuerySortOrder {
  ASC
  DESC
}

"""
Interface for entities that are revisionable.
This corresponds to the core RevisionableInterface but is only implemeted by entity types where revisions are enabled.
"""
interface EntityRevisionable {
  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
  id: String
}

"""An entity that is translatable."""
interface EntityTranslatable {
  """Get all translations."""
  translations: [EntityTranslatable]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): EntityTranslatable
  id: String
}

enum EntityType {
  """Language"""
  CONFIGURABLE_LANGUAGE

  """File"""
  FILE

  """Media"""
  MEDIA

  """Menu"""
  MENU

  """Custom menu link"""
  MENU_LINK_CONTENT

  """Content"""
  NODE

  """Paragraph"""
  PARAGRAPH

  """Taxonomy term"""
  TAXONOMY_TERM

  """Taxonomy vocabulary"""
  TAXONOMY_VOCABULARY
}

interface EntityUrl {
  path: String!
  entity: Entity
  routeName: String!
  breadcrumb: [Breadcrumb!]!
  languageSwitchLinks: [LanguageSwitchLink!]!
}

type ExternalUrl implements Url {
  path: String!
}

"""A field item list containing items."""
interface FieldItemList {
  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity

  """The field items."""
  list: [FieldItemType]
}

"""Location"""
type FieldItemListAddress implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeAddress]

  """The first field item."""
  first: FieldItemTypeAddress

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Block"""
type FieldItemListBlockField implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeBlockField]

  """The first field item."""
  first: FieldItemTypeBlockField

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Status"""
type FieldItemListBoolean implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeBoolean]

  """The first field item."""
  first: FieldItemTypeBoolean

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Changed"""
type FieldItemListChanged implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeChanged]

  """The first field item."""
  first: FieldItemTypeChanged

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Created"""
type FieldItemListCreated implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeCreated]

  """The first field item."""
  first: FieldItemTypeCreated

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Project period"""
type FieldItemListDaterange implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeDaterange]

  """The first field item."""
  first: FieldItemTypeDaterange

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Date"""
type FieldItemListDaterangeTimezone implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeDaterangeTimezone]

  """The first field item."""
  first: FieldItemTypeDaterangeTimezone

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Publication date"""
type FieldItemListDatetime implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeDatetime]

  """The first field item."""
  first: FieldItemTypeDatetime

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Overall budget"""
type FieldItemListDecimal implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeDecimal]

  """The first field item."""
  first: FieldItemTypeDecimal

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Overview"""
type FieldItemListDescriptionListField implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeDescriptionListField]

  """The first field item."""
  first: FieldItemTypeDescriptionListField

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Entity metas"""
type FieldItemListEmrItemEntityMetas implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeEmrItemEntityMetas]

  """The first field item."""
  first: FieldItemTypeEmrItemEntityMetas

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""User ID"""
type FieldItemListEntityReference implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeEntityReference]

  """The first field item."""
  first: FieldItemTypeEntityReference

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Related Links"""
type FieldItemListEntityReferenceRevisions implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeEntityReferenceRevisions]

  """The first field item."""
  first: FieldItemTypeEntityReferenceRevisions

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Version"""
type FieldItemListEntityVersion implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeEntityVersion]

  """The first field item."""
  first: FieldItemTypeEntityVersion

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Entity meta"""
type FieldItemListEwcmsSiteTreeMenuLinkEntityMetas implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeEwcmsSiteTreeMenuLinkEntityMetas]

  """The first field item."""
  first: FieldItemTypeEwcmsSiteTreeMenuLinkEntityMetas

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""File"""
type FieldItemListFile implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeFile]

  """The first field item."""
  first: FieldItemTypeFile

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Remote File"""
type FieldItemListFileLink implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeFileLink]

  """The first field item."""
  first: FieldItemTypeFileLink

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""URI"""
type FieldItemListFileUri implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeFileUri]

  """The first field item."""
  first: FieldItemTypeFileUri

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Overall budget (deprecated)"""
type FieldItemListFloat implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeFloat]

  """The first field item."""
  first: FieldItemTypeFloat

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Thumbnail"""
type FieldItemListImage implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeImage]

  """The first field item."""
  first: FieldItemTypeImage

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""File ID"""
type FieldItemListInteger implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeInteger]

  """The first field item."""
  first: FieldItemTypeInteger

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Webtools chart snippet"""
type FieldItemListJson implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeJson]

  """The first field item."""
  first: FieldItemTypeJson

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Language code"""
type FieldItemListLanguage implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeLanguage]

  """The first field item."""
  first: FieldItemTypeLanguage

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Webtools frame"""
type FieldItemListLink implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeLink]

  """The first field item."""
  first: FieldItemTypeLink

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Link with description"""
type FieldItemListLinkDescription implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeLinkDescription]

  """The first field item."""
  first: FieldItemTypeLinkDescription

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Columns"""
type FieldItemListListInteger implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeListInteger]

  """The first field item."""
  first: FieldItemTypeListInteger

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""File location"""
type FieldItemListListString implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeListString]

  """The first field item."""
  first: FieldItemTypeListString

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Metatags (Hidden field for JSON support)"""
type FieldItemListMap implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeMap]

  """The first field item."""
  first: FieldItemTypeMap

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Metatags"""
type FieldItemListMetatag implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeMetatag]

  """The first field item."""
  first: FieldItemTypeMetatag

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Featured media"""
type FieldItemListOeFeaturedMedia implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeOeFeaturedMedia]

  """The first field item."""
  first: FieldItemTypeOeFeaturedMedia

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""JavaScript asset URL"""
type FieldItemListOeMediaJsAssetUrl implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeOeMediaJsAssetUrl]

  """The first field item."""
  first: FieldItemTypeOeMediaJsAssetUrl

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""URL alias"""
type FieldItemListPath implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypePath]

  """The first field item."""
  first: FieldItemTypePath

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Resource type"""
type FieldItemListSkosConceptEntityReference implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeSkosConceptEntityReference]

  """The first field item."""
  first: FieldItemTypeSkosConceptEntityReference

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Filename"""
type FieldItemListString implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeString]

  """The first field item."""
  first: FieldItemTypeString

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Revision log message"""
type FieldItemListStringLong implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeStringLong]

  """The first field item."""
  first: FieldItemTypeStringLong

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Long description"""
type FieldItemListTextLong implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeTextLong]

  """The first field item."""
  first: FieldItemTypeTextLong

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Body text"""
type FieldItemListTextWithSummary implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeTextWithSummary]

  """The first field item."""
  first: FieldItemTypeTextWithSummary

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Biography"""
type FieldItemListTimelineField implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeTimelineField]

  """The first field item."""
  first: FieldItemTypeTimelineField

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""Social media links"""
type FieldItemListTypedLink implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeTypedLink]

  """The first field item."""
  first: FieldItemTypeTypedLink

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""UUID"""
type FieldItemListUuid implements FieldItemList {
  """Array of field items."""
  list: [FieldItemTypeUuid]

  """The first field item."""
  first: FieldItemTypeUuid

  """True if the field list has no items."""
  isEmpty: Boolean!

  """The number of field items."""
  count: Int!

  """Get a string representation of all field items."""
  getString: String!

  """Get the entity the field belongs to."""
  entity: Entity
}

"""An item in a field list."""
interface FieldItemType {
  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeAddress implements FieldItemType {
  """{field: langcode} The language code"""
  langcode: String

  """{field: country_code} The two-letter country code"""
  countryCode: String

  """
  {field: administrative_area} The top-level administrative subdivision of the country
  """
  administrativeArea: String

  """{field: locality} The locality (i.e. city)"""
  locality: String

  """
  {field: dependent_locality} The dependent locality (i.e. neighbourhood)
  """
  dependentLocality: String

  """{field: postal_code} The postal code"""
  postalCode: String

  """{field: sorting_code} The sorting code"""
  sortingCode: String

  """{field: address_line1} The first line of the address block"""
  addressLine1: String

  """{field: address_line2} The second line of the address block"""
  addressLine2: String

  """{field: organization} The organization"""
  organization: String

  """{field: given_name} The given name"""
  givenName: String

  """{field: additional_name} The additional name"""
  additionalName: String

  """{field: family_name} The family name"""
  familyName: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeBlockField implements FieldItemType {
  """{field: plugin_id} Plugin ID"""
  pluginId: String

  """{field: settings} Settings"""
  settings: MapData

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeBoolean implements FieldItemType {
  """{field: value} Boolean value"""
  value: Boolean

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeChanged implements FieldItemType & FieldItemTypeTimestampInterface & FieldItemTypeStringInterface {
  """{field: value} Timestamp value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeCreated implements FieldItemType & FieldItemTypeTimestampInterface & FieldItemTypeStringInterface {
  """{field: value} Timestamp value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeDaterange implements FieldItemType & FieldItemTypeTimestampInterface & FieldItemTypeStringInterface {
  """{field: value} Start date value"""
  value: String

  """{field: end_value} End date value"""
  endValue: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeDaterangeTimezone implements FieldItemType & FieldItemTypeTimestampInterface & FieldItemTypeStringInterface {
  """{field: value} Start date value"""
  value: String

  """{field: end_value} End date value"""
  endValue: String

  """{field: timezone} Timezone"""
  timezone: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeDatetime implements FieldItemType & FieldItemTypeTimestampInterface & FieldItemTypeStringInterface {
  """{field: value} Date value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeDecimal implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Decimal value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeDescriptionListField implements FieldItemType {
  """{field: term} Term"""
  term: String

  """{field: description} Description"""
  description: String

  """{field: format} Text format"""
  format: String

  """{field: description_processed} Processed description"""
  descriptionProcessed: String

  """{field: translation_id} Translation ID"""
  translationId: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeEmrItemEntityMetas implements FieldItemType {
  """{field: entity} The entity"""
  entity: Entity

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeEntityReference implements FieldItemType {
  """{field: target_id} User ID"""
  targetId: Int

  """{field: entity} User"""
  entity: Entity

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeEntityReferenceRevisions implements FieldItemType {
  """{field: target_id} Related Links ID"""
  targetId: Int

  """{field: entity} Related Links"""
  entity: Entity

  """{field: target_revision_id} Related Links revision ID"""
  targetRevisionId: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeEntityVersion implements FieldItemType {
  """{field: major} Major number"""
  major: Int

  """{field: minor} Minor number"""
  minor: Int

  """{field: patch} Patch number"""
  patch: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeEwcmsSiteTreeMenuLinkEntityMetas implements FieldItemType {
  """{field: entity} The entity"""
  entity: Entity

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeFile implements FieldItemType {
  """{field: target_id} File ID"""
  targetId: Int

  """{field: entity} File"""
  entity: File

  """{field: display} Display"""
  display: Boolean

  """{field: description} Description"""
  description: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeFileLink implements FieldItemType {
  """{field: uri} URI"""
  uri: Url

  """{field: title} Link text"""
  title: String

  """{field: options} Options"""
  options: MapData

  """{field: size} Size"""
  size: Int

  """{field: format} Format"""
  format: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeFileUri implements FieldItemType {
  """{field: value} URI value"""
  value: Url

  """{field: url} Root-relative file URL"""
  url: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeFloat implements FieldItemType {
  """{field: value} Float"""
  value: Float

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeImage implements FieldItemType {
  """{field: target_id} File ID"""
  targetId: Int

  """{field: entity} File"""
  entity: File

  """{field: alt} Alternative text"""
  alt: String

  """{field: title} Title"""
  title: String

  """{field: width} Width"""
  width: Int

  """{field: height} Height"""
  height: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
  derivative(style: ImageStyleId!): ImageResource
}

type FieldItemTypeInteger implements FieldItemType & FieldItemTypeIntegerInterface {
  """{field: value} Integer value"""
  value: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

"""Interface for field item types with an integer value."""
interface FieldItemTypeIntegerInterface {
  value: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeJson implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} JSON Value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeLanguage implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Language code"""
  value: String

  """{field: language} Language object"""
  language: LanguageInterface

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeLink implements FieldItemType {
  """{field: uri} URI"""
  uri: Url

  """{field: title} Link text"""
  title: String

  """{field: options} Options"""
  options: MapData

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeLinkDescription implements FieldItemType {
  """{field: uri} URI"""
  uri: Url

  """{field: title} Link text"""
  title: String

  """{field: options} Options"""
  options: MapData

  """{field: description} Link description"""
  description: String

  """{field: translation_id} Translation ID"""
  translationId: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeListInteger implements FieldItemType & FieldItemTypeIntegerInterface {
  """{field: value} Integer value"""
  value: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeListString implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeMap implements FieldItemType {
  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeMetatag implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Metatag"""
  value: String

  """{field: title} Page title"""
  title: String

  """{field: description} Description"""
  description: String

  """{field: abstract} Abstract"""
  abstract: String

  """{field: keywords} Keywords"""
  keywords: String

  """{field: geo_region} Geographical region"""
  geoRegion: String

  """{field: geo_position} Geographical position"""
  geoPosition: String

  """{field: icbm} ICBM"""
  icbm: String

  """{field: geo_placename} Geographical place name"""
  geoPlacename: String

  """{field: canonical_url} Canonical URL"""
  canonicalUrl: String

  """{field: content_language} Content Language"""
  contentLanguage: String

  """{field: shortlink} Shortlink URL"""
  shortlink: String

  """{field: robots} Robots"""
  robots: String

  """{field: next} Next page URL"""
  next: String

  """{field: news_keywords} News Keywords"""
  newsKeywords: String

  """{field: prev} Previous page URL"""
  prev: String

  """{field: standout} Standout"""
  standout: String

  """{field: image_src} Image"""
  imageSrc: String

  """{field: original_source} Original source"""
  originalSource: String

  """{field: generator} Generator"""
  generator: String

  """{field: author} Author"""
  author: String

  """{field: referrer} Referrer policy"""
  referrer: String

  """{field: refresh} Refresh"""
  refresh: String

  """{field: rating} Rating"""
  rating: String

  """{field: rights} Rights"""
  rights: String

  """{field: set_cookie} Set cookie"""
  setCookie: String

  """{field: google} Google"""
  google: String

  """{field: revisit_after} Revisit After"""
  revisitAfter: String

  """{field: cache_control} Cache control"""
  cacheControl: String

  """{field: expires} Expires"""
  expires: String

  """{field: pragma} Pragma"""
  pragma: String

  """{field: og_determiner} Determiner"""
  ogDeterminer: String

  """{field: og_site_name} Site name"""
  ogSiteName: String

  """{field: og_type} Content type"""
  ogType: String

  """{field: og_url} Page URL"""
  ogUrl: String

  """{field: og_title} Title"""
  ogTitle: String

  """{field: og_description} Description"""
  ogDescription: String

  """{field: og_image} Image"""
  ogImage: String

  """{field: og_video} Video URL"""
  ogVideo: String

  """{field: og_image_url} Image URL"""
  ogImageUrl: String

  """{field: og_video_secure_url} Video Secure URL"""
  ogVideoSecureUrl: String

  """{field: og_image_secure_url} Image Secure URL"""
  ogImageSecureUrl: String

  """{field: og_image_type} Image type"""
  ogImageType: String

  """{field: og_video_type} Video type"""
  ogVideoType: String

  """{field: og_video_width} Video width"""
  ogVideoWidth: String

  """{field: og_image_width} Image width"""
  ogImageWidth: String

  """{field: og_image_height} Image height"""
  ogImageHeight: String

  """{field: og_video_height} Video height"""
  ogVideoHeight: String

  """{field: og_updated_time} Content modification date &amp; time"""
  ogUpdatedTime: String

  """{field: og_image_alt} Image &#039;alt&#039;"""
  ogImageAlt: String

  """{field: og_video_duration} Video duration (seconds)"""
  ogVideoDuration: String

  """{field: og_see_also} See also"""
  ogSeeAlso: String

  """{field: og_latitude} Latitude"""
  ogLatitude: String

  """{field: og_longitude} Longitude"""
  ogLongitude: String

  """{field: og_street_address} Street address"""
  ogStreetAddress: String

  """{field: og_locality} Locality"""
  ogLocality: String

  """{field: og_region} Region"""
  ogRegion: String

  """{field: og_postal_code} Postal/ZIP code"""
  ogPostalCode: String

  """{field: og_country_name} Country name"""
  ogCountryName: String

  """{field: og_email} Email address"""
  ogEmail: String

  """{field: og_phone_number} Phone number"""
  ogPhoneNumber: String

  """{field: og_fax_number} Fax number"""
  ogFaxNumber: String

  """{field: og_locale} Locale"""
  ogLocale: String

  """{field: og_locale_alternative} Alternative locales"""
  ogLocaleAlternative: String

  """{field: article_author} Article author"""
  articleAuthor: String

  """{field: article_publisher} Article publisher"""
  articlePublisher: String

  """{field: article_section} Article section"""
  articleSection: String

  """{field: article_tag} Article tag(s)"""
  articleTag: String

  """{field: article_published_time} Article publication date &amp; time"""
  articlePublishedTime: String

  """{field: article_modified_time} Article modification date &amp; time"""
  articleModifiedTime: String

  """{field: article_expiration_time} Article expiration date &amp; time"""
  articleExpirationTime: String

  """{field: book_author} Book author"""
  bookAuthor: String

  """{field: book_isbn} ISBN"""
  bookIsbn: String

  """{field: book_release_date} Release Date"""
  bookReleaseDate: String

  """{field: book_tag} Book tag(s)"""
  bookTag: String

  """{field: og_audio} Audio URL"""
  ogAudio: String

  """{field: og_audio_secure_url} Audio secure URL"""
  ogAudioSecureUrl: String

  """{field: og_audio_type} Audio type"""
  ogAudioType: String

  """{field: profile_first_name} First name"""
  profileFirstName: String

  """{field: profile_last_name} Last name"""
  profileLastName: String

  """{field: profile_gender} Gender"""
  profileGender: String

  """{field: profile_username} Username"""
  profileUsername: String

  """{field: video_actor} Actor(s)"""
  videoActor: String

  """{field: video_actor_role} Actor&#039;s role"""
  videoActorRole: String

  """{field: video_director} Director(s)"""
  videoDirector: String

  """{field: video_series} Series"""
  videoSeries: String

  """{field: video_release_date} Release date"""
  videoReleaseDate: String

  """{field: video_tag} Tag words"""
  videoTag: String

  """{field: video_writer} Scriptwriter(s)"""
  videoWriter: String

  """{field: twitter_cards_type} Twitter card type"""
  twitterCardsType: String

  """{field: twitter_cards_site} Site&#039;s Twitter account"""
  twitterCardsSite: String

  """{field: twitter_cards_title} Title"""
  twitterCardsTitle: String

  """{field: twitter_cards_description} Description"""
  twitterCardsDescription: String

  """{field: twitter_cards_site_id} Site&#039;s Twitter account ID"""
  twitterCardsSiteId: String

  """{field: twitter_cards_creator} Creator&#039;s Twitter account"""
  twitterCardsCreator: String

  """{field: twitter_cards_creator_id} Creator&#039;s Twitter account ID"""
  twitterCardsCreatorId: String

  """{field: twitter_cards_donottrack} Do Not Track"""
  twitterCardsDonottrack: String

  """{field: twitter_cards_page_url} Page URL"""
  twitterCardsPageUrl: String

  """{field: twitter_cards_image_height} Image height"""
  twitterCardsImageHeight: String

  """{field: twitter_cards_image} Image URL"""
  twitterCardsImage: String

  """{field: twitter_cards_image_alt} Image alternative text"""
  twitterCardsImageAlt: String

  """{field: twitter_cards_image_width} Image width"""
  twitterCardsImageWidth: String

  """{field: twitter_cards_gallery_image0} 1st gallery image"""
  twitterCardsGalleryImage0: String

  """{field: twitter_cards_gallery_image1} 2nd gallery image"""
  twitterCardsGalleryImage1: String

  """{field: twitter_cards_gallery_image2} 3rd gallery image"""
  twitterCardsGalleryImage2: String

  """{field: twitter_cards_gallery_image3} 4th gallery image"""
  twitterCardsGalleryImage3: String

  """{field: twitter_cards_app_store_country} App store country"""
  twitterCardsAppStoreCountry: String

  """{field: twitter_cards_app_name_iphone} iPhone app name"""
  twitterCardsAppNameIphone: String

  """
  {field: twitter_cards_app_url_iphone} iPhone app&#039;s custom URL scheme
  """
  twitterCardsAppUrlIphone: String

  """{field: twitter_cards_app_id_iphone} iPhone app ID"""
  twitterCardsAppIdIphone: String

  """{field: twitter_cards_app_name_ipad} iPad app name"""
  twitterCardsAppNameIpad: String

  """{field: twitter_cards_app_id_ipad} iPad app ID"""
  twitterCardsAppIdIpad: String

  """{field: twitter_cards_app_url_ipad} iPad app&#039;s custom URL scheme"""
  twitterCardsAppUrlIpad: String

  """{field: twitter_cards_app_name_googleplay} Google Play app name"""
  twitterCardsAppNameGoogleplay: String

  """{field: twitter_cards_app_id_googleplay} Google Play app ID"""
  twitterCardsAppIdGoogleplay: String

  """
  {field: twitter_cards_app_url_googleplay} Google Play app&#039;s custom URL scheme
  """
  twitterCardsAppUrlGoogleplay: String

  """{field: twitter_cards_player} Media player URL"""
  twitterCardsPlayer: String

  """{field: twitter_cards_player_width} Media player width"""
  twitterCardsPlayerWidth: String

  """{field: twitter_cards_player_height} Media player height"""
  twitterCardsPlayerHeight: String

  """{field: twitter_cards_player_stream} MP4 media stream URL"""
  twitterCardsPlayerStream: String

  """
  {field: twitter_cards_player_stream_content_type} MP4 media stream MIME-type
  """
  twitterCardsPlayerStreamContentType: String

  """{field: twitter_cards_label1} Label 1"""
  twitterCardsLabel1: String

  """{field: twitter_cards_data1} Data 1"""
  twitterCardsData1: String

  """{field: twitter_cards_label2} Label 2"""
  twitterCardsLabel2: String

  """{field: twitter_cards_data2} Data 2"""
  twitterCardsData2: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeOeFeaturedMedia implements FieldItemType {
  """{field: target_id} Media ID"""
  targetId: Int

  """{field: entity} Media"""
  entity: Media

  """{field: caption} Caption"""
  caption: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeOeMediaJsAssetUrl implements FieldItemType {
  """{field: environment} Environment"""
  environment: String

  """{field: path} JavaScript relative path"""
  path: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypePath implements FieldItemType {
  """{field: alias} Path alias"""
  alias: String

  """{field: pid} Path id"""
  pid: Int

  """{field: langcode} Language Code"""
  langcode: String

  """{field: pathauto} Pathauto state"""
  pathauto: Int

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeSkosConceptEntityReference implements FieldItemType {
  """{field: target_id} SKOS Concept ID"""
  targetId: String

  """{field: entity} SKOS Concept"""
  entity: Entity

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeString implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

"""Interface for string field types."""
interface FieldItemTypeStringInterface {
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeStringLong implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeTextLong implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text"""
  value: String

  """{field: format} Text format"""
  format: String

  """{field: processed} Processed text"""
  processed: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeTextWithSummary implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text"""
  value: String

  """{field: format} Text format"""
  format: String

  """{field: processed} Processed text"""
  processed: String

  """{field: summary} Summary"""
  summary: String

  """{field: summary_processed} Processed summary"""
  summaryProcessed: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeTimelineField implements FieldItemType {
  """{field: label} Label"""
  label: String

  """{field: title} Title"""
  title: String

  """{field: body} Body"""
  body: String

  """{field: format} Text format"""
  format: String

  """{field: body_processed} Processed body"""
  bodyProcessed: String

  """{field: translation_id} Translation ID"""
  translationId: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

"""Interface for field item types with a timestamp value."""
interface FieldItemTypeTimestampInterface {
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeTypedLink implements FieldItemType {
  """{field: uri} URI"""
  uri: Url

  """{field: title} Link text"""
  title: String

  """{field: options} Options"""
  options: MapData

  """{field: link_type} Link Type"""
  linkType: String

  """{field: translation_id} Translation ID"""
  translationId: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

type FieldItemTypeUuid implements FieldItemType & FieldItemTypeStringInterface {
  """{field: value} Text value"""
  value: String

  """True if this item is considered empty."""
  isEmpty: Boolean!
}

"""File"""
type File implements Entity & EntityLinkable {
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url
}

type ImageResource {
  """The path of the image."""
  urlPath: String

  """The width of the generated image."""
  width: Int

  """The height of the generated image."""
  height: Int
}

enum ImageStyleId {
  """{blockquote_image} Blockquote image"""
  BLOCKQUOTE_IMAGE

  """{embed_100_width} 100% width"""
  EMBED_100_WIDTH

  """{embed_100_width_2x} 100% width 2x"""
  EMBED_100_WIDTH_2X

  """{embed_large} Embed large"""
  EMBED_LARGE

  """{embed_large_2x} Embed large 2x"""
  EMBED_LARGE_2X

  """{embed_medium} Embed medium"""
  EMBED_MEDIUM

  """{embed_medium_2x} Embed medium 2x"""
  EMBED_MEDIUM_2X

  """{embed_small} Embed small"""
  EMBED_SMALL

  """{embed_small_2x} Embed small 2x"""
  EMBED_SMALL_2X

  """{ewcms_metatag_image} Metatag image"""
  EWCMS_METATAG_IMAGE

  """{large} Large (480×480)"""
  LARGE

  """{linkit_result_thumbnail} Linkit result thumbnail"""
  LINKIT_RESULT_THUMBNAIL

  """{media_entity_browser_thumbnail} Media Entity Browser thumbnail"""
  MEDIA_ENTITY_BROWSER_THUMBNAIL

  """{medium} Medium (220×220)"""
  MEDIUM

  """{oe_theme_full_width} Full width (3840)"""
  OE_THEME_FULL_WIDTH

  """{oe_theme_list_item} List item"""
  OE_THEME_LIST_ITEM

  """{oe_theme_list_item_2x} List item 2x"""
  OE_THEME_LIST_ITEM_2X

  """{oe_theme_list_item_featured} List Item Featured"""
  OE_THEME_LIST_ITEM_FEATURED

  """{oe_theme_list_item_featured_2x} List Item Featured 2x"""
  OE_THEME_LIST_ITEM_FEATURED_2X

  """{oe_theme_medium_2x_no_crop} Medium 2x (no crop)"""
  OE_THEME_MEDIUM_2X_NO_CROP

  """{oe_theme_medium_no_crop} Medium (no crop)"""
  OE_THEME_MEDIUM_NO_CROP

  """{oe_theme_publication_thumbnail} Publication thumbnail"""
  OE_THEME_PUBLICATION_THUMBNAIL

  """{oe_theme_ratio_3_2_medium} Ratio 3:2 medium"""
  OE_THEME_RATIO_3_2_MEDIUM

  """{oe_theme_small_2x_no_crop} Small 2x (no crop)"""
  OE_THEME_SMALL_2X_NO_CROP

  """{oe_theme_small_no_crop} Small (no crop)"""
  OE_THEME_SMALL_NO_CROP

  """{page_header_background} Page header background"""
  PAGE_HEADER_BACKGROUND

  """{thumbnail} Thumbnail (100×100)"""
  THUMBNAIL

  """{wide} Wide (1090)"""
  WIDE
}

interface InternalUrl {
  path: String!
  routeName: String!
  breadcrumb: [Breadcrumb!]!
  languageSwitchLinks: [LanguageSwitchLink!]!
}

enum Langcode {
  """Bulgarian"""
  BG

  """Spanish"""
  ES

  """Czech"""
  CS

  """Danish"""
  DA

  """German"""
  DE

  """Estonian"""
  ET

  """Greek"""
  EL

  """English"""
  EN

  """French"""
  FR

  """Irish"""
  GA

  """Croatian"""
  HR

  """Italian"""
  IT

  """Latvian"""
  LV

  """Lithuanian"""
  LT

  """Hungarian"""
  HU

  """Maltese"""
  MT

  """Dutch"""
  NL

  """Polish"""
  PL

  """Portuguese"""
  PT_PT

  """Romanian"""
  RO

  """Slovak"""
  SK

  """Slovenian"""
  SL

  """Finnish"""
  FI

  """Swedish"""
  SV

  """Arabic"""
  AR

  """Catalan"""
  CA

  """Icelandic"""
  IS

  """Hebrew"""
  HE

  """Luxembourgish"""
  LB

  """Norwegian Bokmål"""
  NB

  """Russian"""
  RU

  """Swahili"""
  SW

  """Turkish"""
  TR

  """Ukrainian"""
  UK

  """Chinese"""
  ZH_HANS
}

type Language implements LanguageInterface {
  id: String
  name: String!
  direction: Int!
  weight: Int
  isLocked: Boolean!
}

"""Interface for a language."""
interface LanguageInterface {
  id: String
  name: String!
  direction: Int!
  weight: Int
  isLocked: Boolean!
}

type LanguageSwitchLink {
  active: Boolean!
  title: String!
  url: Url!
  language: ConfigurableLanguage!
}

"""Generic type for untyped values."""
scalar MapData

"""Media"""
interface Media {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
}

"""AV Portal Photo"""
type MediaAvPortalPhoto implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaAvPortalPhoto]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaAvPortalPhoto
}

"""AV Portal Video"""
type MediaAvPortalVideo implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaAvPortalVideo]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaAvPortalVideo
}

"""Document"""
type MediaDocument implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaDocument]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaDocument
}

"""Iframe"""
type MediaIframe implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaIframe]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaIframe
}

"""Image"""
type MediaImage implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaImage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaImage
}

"""JavaScript asset"""
type MediaJavascriptAsset implements Media & Entity & EntityLinkable & EntityRevisionable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
}

"""Remote video"""
type MediaRemoteVideo implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaRemoteVideo]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaRemoteVideo
}

"""Video iframe"""
type MediaVideoIframe implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaVideoIframe]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaVideoIframe
}

"""Webtools chart"""
type MediaWebtoolsChart implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsChart]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsChart
}

"""Webtools countdown"""
type MediaWebtoolsCountdown implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsCountdown]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsCountdown
}

"""Webtools generic"""
type MediaWebtoolsGeneric implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsGeneric]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsGeneric
}

"""Webtools map"""
type MediaWebtoolsMap implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsMap]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsMap
}

"""Webtools op publication list"""
type MediaWebtoolsOpPublicationList implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsOpPublicationList]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsOpPublicationList
}

"""Webtools social feed"""
type MediaWebtoolsSocialFeed implements Media & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """The URL of the file belonging to the media."""
  mediaFileUrl: Url
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MediaWebtoolsSocialFeed]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MediaWebtoolsSocialFeed
}

"""Menu"""
type Menu implements Entity {
  id: String
  links: [MenuLinkTreeElement!]!
}

type MenuLink {
  url: Url
  label: String!
  description: String
  expanded: Boolean!
  content: MenuLinkContent
  attribute(name: String!): String
}

"""Custom menu link"""
interface MenuLinkContent {
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
}

"""Custom menu link"""
type MenuLinkContentMenuLinkContent implements MenuLinkContent & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [MenuLinkContentMenuLinkContent]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): MenuLinkContentMenuLinkContent
}

type MenuLinkTreeElement {
  link: MenuLink!
  subtree: [MenuLinkTreeElement!]!
}

enum MenuName {
  """Links related to the active user account"""
  ACCOUNT

  """Administrative task links"""
  ADMIN

  """Controls the EWCMS site tree"""
  EWCMS_SITE_TREE

  """Site information links"""
  FOOTER

  """Site section links"""
  MAIN

  """User tool links, often added by modules"""
  TOOLS
}

type Mutation {
  ping: String
}

"""Content"""
interface Node {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: title} """
  titleRawField: FieldItemListString

  """{value} {field: title} """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
}

"""Calendar item"""
type NodeEwcmsCalendarItem implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeEwcmsCalendarItem]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeEwcmsCalendarItem
}

"""Europa List Page"""
type NodeEwcmsEuropaListPage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """{field: paragraphs} """
  paragraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: paragraphs} """
  paragraphs: [Paragraph]
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeEwcmsEuropaListPage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeEwcmsEuropaListPage
}

"""Pool Page"""
type NodeEwcmsPoolPage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeEwcmsPoolPage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeEwcmsPoolPage
}

"""RSS List Page"""
type NodeEwcmsRssListPage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """{field: paragraphs} """
  paragraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: paragraphs} """
  paragraphs: [Paragraph]
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeEwcmsRssListPage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeEwcmsRssListPage
}

"""Landing Page"""
type NodeLandingPage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """{field: paragraphs} """
  paragraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: paragraphs} """
  paragraphs: [Paragraph]
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeLandingPage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeLandingPage
}

"""Call for proposals"""
type NodeOeCallProposals implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeCallProposals]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeCallProposals
}

"""Call for tenders"""
type NodeOeCallTenders implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeCallTenders]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeCallTenders
}

"""Consultation"""
type NodeOeConsultation implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeConsultation]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeConsultation
}

"""Event"""
type NodeOeEvent implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeEvent]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeEvent
}

"""List page"""
type NodeOeListPage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """{field: paragraphs} """
  paragraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: paragraphs} """
  paragraphs: [Paragraph]
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeListPage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeListPage
}

"""News"""
type NodeOeNews implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeNews]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeNews
}

"""Organisation"""
type NodeOeOrganisation implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeOrganisation]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeOrganisation
}

"""Page"""
type NodeOePage implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOePage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOePage
}

"""Person"""
type NodeOePerson implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOePerson]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOePerson
}

"""Policy"""
type NodeOePolicy implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOePolicy]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOePolicy
}

"""Project"""
type NodeOeProject implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOeProject]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOeProject
}

"""Publication"""
type NodeOePublication implements Node & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: nid} """
  nidRawField: FieldItemListInteger

  """{value} {field: nid} """
  nid: Int

  """{field: vid} """
  vidRawField: FieldItemListInteger

  """{value} {field: vid} """
  vid: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """
  {field: title} The ideal length is 50 to 60 characters including spaces. If it
  must be longer, make sure you fill in a shorter version in the Alternative
  """
  titleRawField: FieldItemListString

  """
  {value} {field: title} The ideal length is 50 to 60 characters including
  spaces. If it must be longer, make sure you fill in a shorter version in the
  Alternative title field.
  """
  title: String

  """{field: created} The time that the node was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the node was created."""
  created: String

  """{field: changed} The time that the node was last edited."""
  changedRawField: FieldItemListChanged

  """{value} {field: changed} The time that the node was last edited."""
  changed: String

  """{field: promote} """
  promoteRawField: FieldItemListBoolean

  """{value} {field: promote} """
  promote: Boolean

  """{field: sticky} """
  stickyRawField: FieldItemListBoolean

  """{value} {field: sticky} """
  sticky: Boolean

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: moderation_state} The moderation state of this piece of content.
  """
  moderationStateRawField: FieldItemListString

  """
  {value} {field: moderation_state} The moderation state of this piece of content.
  """
  moderationState: String

  """{field: path} """
  pathRawField: FieldItemListPath

  """{value} {field: path} """
  path: FieldItemTypePath

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [NodeOePublication]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): NodeOePublication
}

"""Paragraph"""
interface Paragraph {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
}

"""Block reference"""
type ParagraphBlockReference implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """
  {field: field_block} You can select a block of type manual link list, dynamic link list or a custom block.
  """
  fieldBlockRawField: FieldItemListBlockField

  """
  {value} {field: field_block} You can select a block of type manual link list, dynamic link list or a custom block.
  """
  fieldBlock: FieldItemTypeBlockField
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphBlockReference]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphBlockReference
}

"""List with support links"""
type ParagraphEwcmsListSupportLinks implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: ewcms_links_with_description} """
  ewcmsLinksWithDescriptionRawField: FieldItemListLinkDescription

  """{value} {field: ewcms_links_with_description} """
  ewcmsLinksWithDescription: [FieldItemTypeLinkDescription]

  """{field: field_block} """
  fieldBlockRawField: FieldItemListBlockField

  """{value} {field: field_block} """
  fieldBlock: FieldItemTypeBlockField

  """{field: field_oe_social_media_links} """
  fieldOeSocialMediaLinksRawField: FieldItemListTypedLink

  """{value} {field: field_oe_social_media_links} """
  fieldOeSocialMediaLinks: [FieldItemTypeTypedLink]

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphEwcmsListSupportLinks]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphEwcmsListSupportLinks
}

"""Navigation lists"""
type ParagraphNavigationLists implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_content} """
  fieldContentRawField: FieldItemListEntityReference

  """{value} {field: field_content} """
  fieldContent: [Node]

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphNavigationLists]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphNavigationLists
}

"""Accordion"""
type ParagraphOeAccordion implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background.  If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background.  If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeAccordionItem]
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeAccordion]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeAccordion
}

"""Accordion item"""
type ParagraphOeAccordionItem implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_icon} The icons accordingly to the ECL."""
  fieldOeIconRawField: FieldItemListListString

  """{value} {field: field_oe_icon} The icons accordingly to the ECL."""
  fieldOeIcon: String

  """{field: field_oe_text} Accordion title."""
  fieldOeTextRawField: FieldItemListString

  """{value} {field: field_oe_text} Accordion title."""
  fieldOeText: String

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeAccordionItem]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeAccordionItem
}

"""Media"""
type ParagraphOeAvMedia implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_ewcms_full_width} """
  fieldEwcmsFullWidthRawField: FieldItemListBoolean

  """{value} {field: field_ewcms_full_width} """
  fieldEwcmsFullWidth: Boolean

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: Media
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeAvMedia]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeAvMedia
}

"""Banner"""
type ParagraphOeBanner implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_banner_alignment} """
  fieldOeBannerAlignmentRawField: FieldItemListListString

  """{value} {field: field_oe_banner_alignment} """
  fieldOeBannerAlignment: String

  """{field: field_oe_banner_full_width} """
  fieldOeBannerFullWidthRawField: FieldItemListBoolean

  """{value} {field: field_oe_banner_full_width} """
  fieldOeBannerFullWidth: Boolean

  """{field: field_oe_banner_size} """
  fieldOeBannerSizeRawField: FieldItemListListString

  """{value} {field: field_oe_banner_size} """
  fieldOeBannerSize: String

  """{field: field_oe_banner_type} """
  fieldOeBannerTypeRawField: FieldItemListListString

  """{value} {field: field_oe_banner_type} """
  fieldOeBannerType: String

  """{field: field_oe_link} """
  fieldOeLinkRawField: FieldItemListLink

  """{value} {field: field_oe_link} """
  fieldOeLink: FieldItemTypeLink

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: Media

  """{field: field_oe_text} """
  fieldOeTextRawField: FieldItemListString

  """{value} {field: field_oe_text} """
  fieldOeText: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeBanner]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeBanner
}

"""Carousel"""
type ParagraphOeCarousel implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_carousel_items} """
  fieldOeCarouselItemsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_carousel_items} """
  fieldOeCarouselItems: [ParagraphOeCarouselItem]

  """{field: field_oe_carousel_size} """
  fieldOeCarouselSizeRawField: FieldItemListListString

  """{value} {field: field_oe_carousel_size} """
  fieldOeCarouselSize: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeCarousel]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeCarousel
}

"""Carousel item"""
type ParagraphOeCarouselItem implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_link} """
  fieldOeLinkRawField: FieldItemListLink

  """{value} {field: field_oe_link} """
  fieldOeLink: FieldItemTypeLink

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: Media

  """{field: field_oe_text} """
  fieldOeTextRawField: FieldItemListString

  """{value} {field: field_oe_text} """
  fieldOeText: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeCarouselItem]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeCarouselItem
}

"""Chart"""
type ParagraphOeChart implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: MediaWebtoolsChart
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeChart]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeChart
}

"""Contact"""
type ParagraphOeContact implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeContact]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeContact
}

"""Content row"""
type ParagraphOeContentRow implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [Paragraph]

  """{field: field_oe_title} The title to show for the inpage navigation."""
  fieldOeTitleRawField: FieldItemListString

  """
  {value} {field: field_oe_title} The title to show for the inpage navigation.
  """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeContentRow]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeContentRow
}

"""Contextual navigation"""
type ParagraphOeContextualNavigation implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """
  {field: field_oe_limit} The number of items to display. When empty, defaults to 4.
  """
  fieldOeLimitRawField: FieldItemListInteger

  """
  {value} {field: field_oe_limit} The number of items to display. When empty, defaults to 4.
  """
  fieldOeLimit: Int

  """{field: field_oe_links} """
  fieldOeLinksRawField: FieldItemListLink

  """{value} {field: field_oe_links} """
  fieldOeLinks: [FieldItemTypeLink]

  """
  {field: field_oe_text} The label for the link that displays all the items. When empty, defaults to "More".
  """
  fieldOeTextRawField: FieldItemListString

  """
  {value} {field: field_oe_text} The label for the link that displays all the items. When empty, defaults to "More".
  """
  fieldOeText: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeContextualNavigation]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeContextualNavigation
}

"""Description list"""
type ParagraphOeDescriptionList implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_description_list_items} """
  fieldOeDescriptionListItemsRawField: FieldItemListDescriptionListField

  """{value} {field: field_oe_description_list_items} """
  fieldOeDescriptionListItems: [FieldItemTypeDescriptionListField]

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeDescriptionList]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeDescriptionList
}

"""Fact"""
type ParagraphOeFact implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_icon} """
  fieldOeIconRawField: FieldItemListListString

  """{value} {field: field_oe_icon} """
  fieldOeIcon: String

  """{field: field_oe_plain_text_long} """
  fieldOePlainTextLongRawField: FieldItemListStringLong

  """{value} {field: field_oe_plain_text_long} """
  fieldOePlainTextLong: String

  """{field: field_oe_subtitle} """
  fieldOeSubtitleRawField: FieldItemListString

  """{value} {field: field_oe_subtitle} """
  fieldOeSubtitle: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeFact]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeFact
}

"""Facts and figures"""
type ParagraphOeFactsFigures implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_link} """
  fieldOeLinkRawField: FieldItemListLink

  """{value} {field: field_oe_link} """
  fieldOeLink: FieldItemTypeLink

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeFact]

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeFactsFigures]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeFactsFigures
}

"""Iframe"""
type ParagraphOeIframeMedia implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """
  {field: field_oe_iframe_media_full_width} Full width is not supported for
  iframes without a ratio set. Enabling full width on an iframe without a ratio
  set will lead to unexpected results. When using an iframe in a content row
  with in-page navigation enabled, leave this unchecked, or the iframe might
  overlap with the in-page navigation itself.
  """
  fieldOeIframeMediaFullWidthRawField: FieldItemListBoolean

  """
  {value} {field: field_oe_iframe_media_full_width} Full width is not supported
  for iframes without a ratio set. Enabling full width on an iframe without a
  ratio set will lead to unexpected results. When using an iframe in a content
  row with in-page navigation enabled, leave this unchecked, or the iframe might
  overlap with the in-page navigation itself.
  """
  fieldOeIframeMediaFullWidth: Boolean

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: MediaIframe

  """{field: field_oe_title} An optional title to show above the iframe."""
  fieldOeTitleRawField: FieldItemListString

  """
  {value} {field: field_oe_title} An optional title to show above the iframe.
  """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIframeMedia]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIframeMedia
}

"""Illustration item with flag"""
type ParagraphOeIllustrationItemFlag implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_flag} """
  fieldOeFlagRawField: FieldItemListListString

  """{value} {field: field_oe_flag} """
  fieldOeFlag: String

  """{field: field_oe_subtitle} """
  fieldOeSubtitleRawField: FieldItemListString

  """{value} {field: field_oe_subtitle} """
  fieldOeSubtitle: String

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationItemFlag]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationItemFlag
}

"""Illustration item with icon"""
type ParagraphOeIllustrationItemIcon implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_icon} """
  fieldOeIconRawField: FieldItemListListString

  """{value} {field: field_oe_icon} """
  fieldOeIcon: String

  """{field: field_oe_subtitle} """
  fieldOeSubtitleRawField: FieldItemListString

  """{value} {field: field_oe_subtitle} """
  fieldOeSubtitle: String

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationItemIcon]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationItemIcon
}

"""Illustration item with image"""
type ParagraphOeIllustrationItemImage implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: Media

  """{field: field_oe_subtitle} """
  fieldOeSubtitleRawField: FieldItemListString

  """{value} {field: field_oe_subtitle} """
  fieldOeSubtitle: String

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationItemImage]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationItemImage
}

"""Illustration list with flags"""
type ParagraphOeIllustrationListFlags implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_center} """
  fieldOeCenterRawField: FieldItemListBoolean

  """{value} {field: field_oe_center} """
  fieldOeCenter: Boolean

  """{field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternateRawField: FieldItemListBoolean

  """{value} {field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternate: Boolean

  """{field: field_oe_illustration_columns} """
  fieldOeIllustrationColumnsRawField: FieldItemListListInteger

  """{value} {field: field_oe_illustration_columns} """
  fieldOeIllustrationColumns: FieldItemTypeListInteger

  """{field: field_oe_illustration_ratio} """
  fieldOeIllustrationRatioRawField: FieldItemListListString

  """{value} {field: field_oe_illustration_ratio} """
  fieldOeIllustrationRatio: String

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeIllustrationItemFlag]

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationListFlags]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationListFlags
}

"""Illustration list with icons"""
type ParagraphOeIllustrationListIcons implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_center} """
  fieldOeCenterRawField: FieldItemListBoolean

  """{value} {field: field_oe_center} """
  fieldOeCenter: Boolean

  """{field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternateRawField: FieldItemListBoolean

  """{value} {field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternate: Boolean

  """{field: field_oe_illustration_columns} """
  fieldOeIllustrationColumnsRawField: FieldItemListListInteger

  """{value} {field: field_oe_illustration_columns} """
  fieldOeIllustrationColumns: FieldItemTypeListInteger

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeIllustrationItemIcon]

  """{field: field_oe_size} """
  fieldOeSizeRawField: FieldItemListListString

  """{value} {field: field_oe_size} """
  fieldOeSize: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationListIcons]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationListIcons
}

"""Illustration list with images"""
type ParagraphOeIllustrationListImages implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_center} """
  fieldOeCenterRawField: FieldItemListBoolean

  """{value} {field: field_oe_center} """
  fieldOeCenter: Boolean

  """{field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternateRawField: FieldItemListBoolean

  """{value} {field: field_oe_illustration_alternate} """
  fieldOeIllustrationAlternate: Boolean

  """{field: field_oe_illustration_columns} """
  fieldOeIllustrationColumnsRawField: FieldItemListListInteger

  """{value} {field: field_oe_illustration_columns} """
  fieldOeIllustrationColumns: FieldItemTypeListInteger

  """{field: field_oe_illustration_ratio} """
  fieldOeIllustrationRatioRawField: FieldItemListListString

  """{value} {field: field_oe_illustration_ratio} """
  fieldOeIllustrationRatio: String

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeIllustrationItemImage]

  """{field: field_oe_size} """
  fieldOeSizeRawField: FieldItemListListString

  """{value} {field: field_oe_size} """
  fieldOeSize: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeIllustrationListImages]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeIllustrationListImages
}

"""Links block"""
type ParagraphOeLinksBlock implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: field_oe_links} """
  fieldOeLinksRawField: FieldItemListLink

  """{value} {field: field_oe_links} """
  fieldOeLinks: [FieldItemTypeLink]

  """{field: field_oe_text} """
  fieldOeTextRawField: FieldItemListString

  """{value} {field: field_oe_text} """
  fieldOeText: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeLinksBlock]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeLinksBlock
}

"""Listing item"""
type ParagraphOeListItem implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """{field: ewcms_border} """
  ewcmsBorderRawField: FieldItemListBoolean

  """{value} {field: ewcms_border} """
  ewcmsBorder: Boolean

  """{field: ewcms_image} List item image."""
  ewcmsImageRawField: FieldItemListEntityReference

  """{value} {field: ewcms_image} List item image."""
  ewcmsImage: Media

  """{field: ewcms_primary_links} """
  ewcmsPrimaryLinksRawField: FieldItemListLink

  """{value} {field: ewcms_primary_links} """
  ewcmsPrimaryLinks: [FieldItemTypeLink]

  """{field: ewcms_secondary_links} """
  ewcmsSecondaryLinksRawField: FieldItemListLink

  """{value} {field: ewcms_secondary_links} """
  ewcmsSecondaryLinks: [FieldItemTypeLink]

  """{field: field_oe_date} Date information."""
  fieldOeDateRawField: FieldItemListDatetime

  """{value} {field: field_oe_date} Date information."""
  fieldOeDate: FieldItemTypeDatetime

  """{field: field_oe_image} List item image."""
  fieldOeImageRawField: FieldItemListImage

  """{value} {field: field_oe_image} List item image."""
  fieldOeImage: FieldItemTypeImage

  """
  {field: field_oe_link} Internal or external link the list item links to.
  """
  fieldOeLinkRawField: FieldItemListLink

  """
  {value} {field: field_oe_link} Internal or external link the list item links to.
  """
  fieldOeLink: FieldItemTypeLink

  """
  {field: field_oe_meta} Additional meta information to show above the title.
  """
  fieldOeMetaRawField: FieldItemListString

  """
  {value} {field: field_oe_meta} Additional meta information to show above the title.
  """
  fieldOeMeta: [String]

  """
  {field: field_oe_text_long} List item description, displayed below the title.
  """
  fieldOeTextLongRawField: FieldItemListTextLong

  """
  {value} {field: field_oe_text_long} List item description, displayed below the title.
  """
  fieldOeTextLong: String

  """{field: field_oe_title} Link item title."""
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} Link item title."""
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeListItem]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeListItem
}

"""Listing item block"""
type ParagraphOeListItemBlock implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: ewcms_listing_flow} """
  ewcmsListingFlowRawField: FieldItemListListString

  """{value} {field: ewcms_listing_flow} """
  ewcmsListingFlow: String

  """
  {field: field_oe_link} Internal or external link to use for a call to action button.
  """
  fieldOeLinkRawField: FieldItemListLink

  """
  {value} {field: field_oe_link} Internal or external link to use for a call to action button.
  """
  fieldOeLink: FieldItemTypeLink

  """{field: field_oe_list_item_block_layout} """
  fieldOeListItemBlockLayoutRawField: FieldItemListListString

  """{value} {field: field_oe_list_item_block_layout} """
  fieldOeListItemBlockLayout: String

  """{field: field_oe_paragraphs} """
  fieldOeParagraphsRawField: FieldItemListEntityReferenceRevisions

  """{value} {field: field_oe_paragraphs} """
  fieldOeParagraphs: [ParagraphOeListItem]

  """{field: field_oe_title} Block title. Optional."""
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} Block title. Optional."""
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeListItemBlock]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeListItemBlock
}

"""Map"""
type ParagraphOeMap implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: MediaWebtoolsMap
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeMap]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeMap
}

"""Quote"""
type ParagraphOeQuote implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """
  {field: field_oe_media} Image must contain only the person quoted, as centred
  as possible. The quote image is squared. For optimal quality, including retina
  screens, select an image with dimensions of at least 200px width per 200px
  """
  fieldOeMediaRawField: FieldItemListEntityReference

  """
  {value} {field: field_oe_media} Image must contain only the person quoted, as
  centred as possible. The quote image is squared. For optimal quality,
  including retina screens, select an image with dimensions of at least 200px
  width per 200px height.
  """
  fieldOeMedia: Media

  """{field: field_oe_plain_text_long} """
  fieldOePlainTextLongRawField: FieldItemListStringLong

  """{value} {field: field_oe_plain_text_long} """
  fieldOePlainTextLong: String

  """
  {field: field_oe_text} Attribution: Acknowledgement of the use of someone
  else's information, data, or other work (The quote author).
  """
  fieldOeTextRawField: FieldItemListString

  """
  {value} {field: field_oe_text} Attribution: Acknowledgement of the use of
  someone else's information, data, or other work (The quote author).
  """
  fieldOeText: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeQuote]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeQuote
}

"""Rich text"""
type ParagraphOeRichText implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_title} An optional title to show above the text."""
  fieldOeTitleRawField: FieldItemListString

  """
  {value} {field: field_oe_title} An optional title to show above the text.
  """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeRichText]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeRichText
}

"""Social feed"""
type ParagraphOeSocialFeed implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: MediaWebtoolsSocialFeed
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeSocialFeed]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeSocialFeed
}

"""Social media follow"""
type ParagraphOeSocialMediaFollow implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: ewcms_show_see_more_link} """
  ewcmsShowSeeMoreLinkRawField: FieldItemListBoolean

  """{value} {field: ewcms_show_see_more_link} """
  ewcmsShowSeeMoreLink: Boolean

  """{field: field_oe_social_media_links} """
  fieldOeSocialMediaLinksRawField: FieldItemListTypedLink

  """{value} {field: field_oe_social_media_links} """
  fieldOeSocialMediaLinks: [FieldItemTypeTypedLink]

  """{field: field_oe_social_media_see_more} """
  fieldOeSocialMediaSeeMoreRawField: FieldItemListLink

  """{value} {field: field_oe_social_media_see_more} """
  fieldOeSocialMediaSeeMore: FieldItemTypeLink

  """{field: field_oe_social_media_variant} """
  fieldOeSocialMediaVariantRawField: FieldItemListListString

  """{value} {field: field_oe_social_media_variant} """
  fieldOeSocialMediaVariant: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeSocialMediaFollow]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeSocialMediaFollow
}

"""Text with Featured media"""
type ParagraphOeTextFeatureMedia implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_feature_media_title} """
  fieldOeFeatureMediaTitleRawField: FieldItemListString

  """{value} {field: field_oe_feature_media_title} """
  fieldOeFeatureMediaTitle: String

  """{field: field_oe_highlighted} """
  fieldOeHighlightedRawField: FieldItemListBoolean

  """{value} {field: field_oe_highlighted} """
  fieldOeHighlighted: Boolean

  """{field: field_oe_link} """
  fieldOeLinkRawField: FieldItemListLink

  """{value} {field: field_oe_link} """
  fieldOeLink: FieldItemTypeLink

  """{field: field_oe_media} """
  fieldOeMediaRawField: FieldItemListEntityReference

  """{value} {field: field_oe_media} """
  fieldOeMedia: Media

  """{field: field_oe_plain_text_long} """
  fieldOePlainTextLongRawField: FieldItemListStringLong

  """{value} {field: field_oe_plain_text_long} """
  fieldOePlainTextLong: String

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeTextFeatureMedia]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeTextFeatureMedia
}

"""Timeline"""
type ParagraphOeTimeline implements Paragraph & Entity & EntityLinkable & EntityRevisionable & EntityTranslatable {
  """{field: revision_id} """
  revisionIdRawField: FieldItemListInteger

  """{value} {field: revision_id} """
  revisionId: Int

  """{field: status} """
  statusRawField: FieldItemListBoolean

  """{value} {field: status} """
  status: Boolean

  """{field: created} The time that the Paragraph was created."""
  createdRawField: FieldItemListCreated

  """{value} {field: created} The time that the Paragraph was created."""
  created: String

  """
  {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentIdRawField: FieldItemListString

  """
  {value} {field: parent_id} The ID of the parent entity of which this entity is referenced.
  """
  parentId: String

  """
  {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentTypeRawField: FieldItemListString

  """
  {value} {field: parent_type} The entity parent type to which this entity is referenced.
  """
  parentType: String

  """
  {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldNameRawField: FieldItemListString

  """
  {value} {field: parent_field_name} The entity parent field name to which this entity is referenced.
  """
  parentFieldName: String

  """{field: behavior_settings} The behavior plugin settings"""
  behaviorSettingsRawField: FieldItemListStringLong

  """{value} {field: behavior_settings} The behavior plugin settings"""
  behaviorSettings: String

  """
  {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcodeRawField: FieldItemListBoolean

  """
  {value} {field: default_langcode} A flag indicating whether this is the default translation.
  """
  defaultLangcode: Boolean

  """
  {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefaultRawField: FieldItemListBoolean

  """
  {value} {field: revision_default} A flag indicating whether this was a default revision when it was saved.
  """
  revisionDefault: Boolean

  """
  {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffectedRawField: FieldItemListBoolean

  """
  {value} {field: revision_translation_affected} Indicates if the last edit of a translation belongs to current revision.
  """
  revisionTranslationAffected: Boolean

  """{field: ewcms_available_translations} """
  ewcmsAvailableTranslationsRawField: FieldItemListLanguage

  """{value} {field: ewcms_available_translations} """
  ewcmsAvailableTranslations: [LanguageInterface]

  """{field: oe_paragraphs_variant} """
  oeParagraphsVariantRawField: FieldItemListString

  """{value} {field: oe_paragraphs_variant} """
  oeParagraphsVariant: String

  """
  {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSourceRawField: FieldItemListLanguage

  """
  {value} {field: content_translation_source} The source language from which this translation was created.
  """
  contentTranslationSource: LanguageInterface

  """
  {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdatedRawField: FieldItemListBoolean

  """
  {value} {field: content_translation_outdated} A boolean indicating whether this translation needs to be updated.
  """
  contentTranslationOutdated: Boolean

  """
  {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChangedRawField: FieldItemListChanged

  """
  {value} {field: content_translation_changed} The Unix timestamp when the translation was most recently saved.
  """
  contentTranslationChanged: String

  """
  {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSectionRawField: FieldItemListBoolean

  """
  {value} {field: ewcms_display_as_section} By enabling this option the current
  paragraph will be visually isolated in a dedicated page section, by means of
  sharing the same background. If more than one adjacent paragraph have this
  option enabled, then all said paragraphs will be displayed as belonging to the
  same page section.
  """
  ewcmsDisplayAsSection: Boolean

  """{field: field_oe_text_long} """
  fieldOeTextLongRawField: FieldItemListTextLong

  """{value} {field: field_oe_text_long} """
  fieldOeTextLong: String

  """{field: field_oe_timeline} """
  fieldOeTimelineRawField: FieldItemListTimelineField

  """{value} {field: field_oe_timeline} """
  fieldOeTimeline: [FieldItemTypeTimelineField]

  """
  {field: field_oe_timeline_expand} Define how many items will be displayed
  before the actionable button to display the full list of items in the
  """
  fieldOeTimelineExpandRawField: FieldItemListListInteger

  """
  {value} {field: field_oe_timeline_expand} Define how many items will be
  displayed before the actionable button to display the full list of items in
  """
  fieldOeTimelineExpand: FieldItemTypeListInteger

  """{field: field_oe_title} """
  fieldOeTitleRawField: FieldItemListString

  """{value} {field: field_oe_title} """
  fieldOeTitle: String
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean

  """Get all translations."""
  translations: [ParagraphOeTimeline]

  """Get a specific translation."""
  translation(
    langcode: Langcode!

    """
    Return entity in current language if translation language does not exist.
    """
    fallback: Boolean
  ): ParagraphOeTimeline
}

type HomePage {
  content: HomePageContent
}

type HomePageContent {
  id: ID!
  entityRevisionId: String
  nid: Int
  title: String
  moderationState: String
  status: Boolean
  paragraphs: [Paragraph]
  featured: Featured
}

type Query {
  ping: String
  homePage: HomePage
  entityQuery(
    """ The machine name of the entity type (e.g. "node", "taxonomy_term", etc.)
    """
    entityType: EntityType!

    """ The maximum amount of items to return. """
    limit: Int = 10

    """ Index of the first item. """
    offset: Int = 0
    revisions: EntityQueryRevisionMode = DEFAULT

    """ Sort results. """
    sort: [EntityQuerySortInput!] = null

    """ Filter results. """
    filter: EntityQueryFilterInput = null
  ): EntityQueryResult!
  entityById(entityType: EntityType!, id: ID!, langcode: Langcode): Entity
  entityByUuid(entityType: EntityType!, uuid: String!, langcode: Langcode): Entity

  """
  Load a menu by its name. The menu is loaded automatically in the
  current language.
  """
  menuByName(
    """The name of the menu."""
    name: MenuName!
  ): Menu
  content(path: String!, revision: Int, langcode: String): Node
  contentPaths(type: String!): [ContentPath]
  route(path: String!): Url
}

type RedirectUrl implements Url {
  path: String!
}

type Featured {
  title: String!
  description: String!
  imageUrl: String!
  imageCaption: String!
  imageAlt: String!
  alignment: String!
  isExtended: Boolean!
}

"""Taxonomy term"""
interface TaxonomyTerm {
  id: String

  """Get the URL, defaults to canonical."""
  url(rel: String, options: UrlOptions): Url

  """
  The revision identifier of the entity, or NULL if the entity does not have a revision identifier.
  """
  entityRevisionId: String

  """TRUE if the entity object was a revision, FALSE otherwise."""
  wasDefaultRevision: Boolean

  """Checks if this entity is the latest revision."""
  isLatestRevision: Boolean
  children: [TaxonomyTerm]
}

"""Taxonomy vocabulary"""
type TaxonomyVocabulary implements Entity {
  id: String
}

"""Interface for an URL."""
interface Url {
  path: String
}

input UrlOptions {
  """Force generating the URL in the given langcode."""
  language: Langcode

  """
  A fragment identifier (named anchor) to append to the URL. Do not include the leading '#' character.
  """
  fragment: String

  """
  Whether to force the output to be an absolute link (beginning with http:).
  Useful for links that will be displayed outside the site, such as in an RSS
  """
  absolute: Boolean
}
`;

const homePage = {
  content: {
    id: '1',
    entityRevisionId: '22',
    nid: 1,
    title: 'Homepage',
    moderationState: 'published',
    status: true,
    paragraphs: [
      {
        '__typename': 'ParagraphOeBanner',
        id: '1',
        fieldOeBannerSize: 's',
        fieldOeBannerFullWidth: true,
        fieldOeBannerAlignment: 'left',
        oeParagraphsVariant: 'text-highlight',
        fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
        fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
        credit: '© Copyright or credit',
        fieldOeMedia: {
          mediaFileUrl: {
            path: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
          },
        },
        fieldOeLink: {
          uri: {
            path: '/'
          },
          title: 'Subscribe',
        },
      },
      {
        '__typename': 'ParagraphOeRichText',
        fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
          <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
          <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
      },
      {
        '__typename': 'ParagraphOeQuote',
        fieldOePlainTextLong: 'Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.',
        fieldOeText: 'John Smith',
        imageAlt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
      },
      {
        '__typename': 'ParagraphOeAccordion',
        id: "1",
        fieldOeParagraphs: [
          {
            id: '4',
            fieldOeText: 'Lorem Ipsum accordion Item',
            fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
            <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
            <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
            fieldOeIcon: 'arrow-down',
          },
          {
            id: '5',
            fieldOeText: 'Lorem Ipsum accordion Item',
            fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
            <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
            <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
            fieldOeIcon: 'arrow-down',
          },
          {
            id: '6',
            fieldOeText: 'Lorem Ipsum accordion Item',
            fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
            <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
            <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
            fieldOeIcon: 'arrow-down',
          },
        ]
      },
    ],
    featured: {
      '__typename': 'Featured',
      title: 'Lorem Ipsum accordion Item',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
      imageCaption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      imageAlt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      alignment: 'left',
      isExtended: true,
    },
  }
};

const resolvers = {
  Query: {
    homePage: () => homePage,
  },
  Media: {
    __resolveType(obj, context, info) {
      // Logic to determine the concrete type of the Media object
      if (obj.mediaFileUrl) {
        return 'MediaImage'; // Assuming MediaImage is one of the concrete types
      }
      // Handle other concrete types if necessary
      return null; // Return null if the type cannot be resolved
    }
  },
  Url: {
    __resolveType(obj, context, info) {
      // Logic to determine the concrete type of the Url object
      if (obj.path) {
        return 'ExternalUrl'; // Assuming AbsoluteUrl is one of the concrete types
      }
      // Handle other concrete types if necessary
      return null; // Return null if the type cannot be resolved
    }
  },
};

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>({ origin: ['http://localhost:4200'], credentials: true }),
  express.json(),
  expressMiddleware(server),
);

app.post('/shutdown', (req, res) => {
  console.log('Received shutdown request. Initiating graceful shutdown...');
  res.sendStatus(200);
  process.kill(process.pid, 'SIGTERM');
});

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal.');
  httpServer.close(() => {
    console.log('Server has gracefully terminated.');
    process.exit(0);
  });
});