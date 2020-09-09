// This file was automatically generated by graphql transpiler

export enum TagFormat {
    NORMAL = 'NORMAL',
    READABLE = 'READABLE',
}

export enum ResetCodeSendMethod {
    EMAIL = 'EMAIL',
    SMS = 'SMS',
}

export enum ComparisonOperator {
    LESS_THAN = 'LESS_THAN',
    GREATER_THAN = 'GREATER_THAN',
}

export enum UserTypes {
    VENDOR_ADMIN = 'VENDOR_ADMIN',
    VENDOR_EMPLOYEE = 'VENDOR_EMPLOYEE',
    CUSTOMER = 'CUSTOMER',
    MASTER = 'MASTER',
    INVALID = 'INVALID',
}

export enum LoyaltyTransactionType {
    EARNING = 'EARNING',
    EARNING_FRIEND = 'EARNING_FRIEND',
    SHARING = 'SHARING',
    REDEEMING = 'REDEEMING',
}

export enum LoyaltyProgramType {
    DOLLAR = 'DOLLAR',
    ORDER = 'ORDER',
    ITEM = 'ITEM',
}

export enum PayoutMethod {
    MANUAL = 'MANUAL',
}

export enum PayoutStatus {
    PENDING = 'PENDING',
    IN_TRANSIT = 'IN_TRANSIT',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
}

export enum PayoutAutoRequestSchedule {
    OFF = 'OFF',
    WEEKLY = 'WEEKLY',
    BI_WEEKLY = 'BI_WEEKLY',
    MONTHLY = 'MONTHLY',
}

export enum WhereFilterGroupOperator {
    AND = 'AND',
    OR = 'OR',
}

export enum WhereFilterOperator {
    EQUALS = 'EQUALS',
    REGEX = 'REGEX',
    GREATER_THAN = 'GREATER_THAN',
    GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
    EXISTS = 'EXISTS',
    DOES_NOT_EXIST = 'DOES_NOT_EXIST',
    NOT_EQUALS = 'NOT_EQUALS',
}

export enum ServiceChargeType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum ServiceChargeReason {
    ORDER_TRANSACTION_FEE = 'ORDER_TRANSACTION_FEE',
    PAYOUT_REQUEST_FEE = 'PAYOUT_REQUEST_FEE',
    OTHER = 'OTHER',
    OTHER_TAXABLE = 'OTHER_TAXABLE',
    TAX = 'TAX',
}

export enum VendorAnalyticsCustomerType {
    FIRST_TIME = 'FIRST_TIME',
    CASUAL = 'CASUAL',
    REGULAR = 'REGULAR',
}

export enum VendorApprovalStatus {
    NOT_APPROVED = 'NOT_APPROVED',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
}

export enum UiBaseDisplayType {
    RESTAURANT = 'RESTAURANT',
    QSR = 'QSR',
}

export enum VendorStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    HIDDEN = 'HIDDEN',
    NOT_ACCEPTING = 'NOT_ACCEPTING',
    LEAVE = 'LEAVE',
}

export enum OrderCancellationReason {
    VENDOR_CANCELLED = 'VENDOR_CANCELLED',
    VENDOR_PREP_CANCELLED = 'VENDOR_PREP_CANCELLED',
    VENDOR_ITEM_SOLD_OUT = 'VENDOR_ITEM_SOLD_OUT',
    VENDOR_STORE_CLOSING_SOON = 'VENDOR_STORE_CLOSING_SOON',
    CUSTOMER_NOT_PICKED_UP = 'CUSTOMER_NOT_PICKED_UP',
    CUSTOMER_CANCELLED = 'CUSTOMER_CANCELLED',
    OTHER = 'OTHER',
}

export enum OrderType {
    EAT_IN = 'EAT_IN',
    TAKE_OUT = 'TAKE_OUT',
    DELIVERY = 'DELIVERY',
    SELF_DELIVERY = 'SELF_DELIVERY',
}

export enum OrderPaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    WALLET = 'WALLET',
    IN_PERSON = 'IN_PERSON',
}

export enum FlashSaleType {
    DOLLAR = 'DOLLAR',
    PERCENTAGE = 'PERCENTAGE',
}

export enum SurveyDeliveryRule {
    AFTER_ORDER = 'AFTER_ORDER',
    MANUAL = 'MANUAL' 
}

export enum SurveyQuestionType {
    CHECKBOX = 'CHECKBOX',
    MULTI_CHECKBOX = 'MULTI_CHECKBOX',
    SHORT_ANSWER = 'SHORT_ANSWER',
    RATING = 'RATING',
}

export enum CategoryType {
    REGULAR = 'REGULAR',
    DAILY_SPECIALS = 'DAILY_SPECIALS',
}

export enum DelivererProfileApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    SUSPENDED = 'SUSPENDED',
}

export enum DelivererAvailabilityStatus {
    AVAILABLE = 'AVAILABLE',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
}

export enum DelivererProfileType {
    REGULAR = 'REGULAR',
    PARTNER = 'PARTNER',
}

export enum DeliveryRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum DeliveryStatus {
    DELIVERER_REQUESTED = 'DELIVERER_REQUESTED',
    DELIVERER_FOUND = 'DELIVERER_FOUND',
    PICKED_UP = 'PICKED_UP',
    RECEIVED_BY_VENDOR = 'RECEIVED_BY_VENDOR',
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED',
}

export enum ShiftTimePeriodType {
    WORK = 'WORK',
    BREAK = 'BREAK',
}

