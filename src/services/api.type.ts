export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
	"roles"?: string,
	"slug"?: string,
	"gender"?: string,
	"birthday"?: string,
	"phone"?: string,
	"code"?: string,
	"address"?: string,
	"lockedAt"?: string,
	"lockMessage"?: string,
	"createdAt"?: string,
}

export interface IProduct {
	"name"?: string;
	"slug"?: string;
	"description"?: string;
	"size"?: number;
	"quantity"?: number;
	"status"?: string;
	"purchasePrice"?: number;
	"salePrice"?: number;
	"deliveryCost"?: number;
	"branchId"?: number;
	"importAt"?: string;
	"exportAt"?: string;
	"createdAt"?: string;
	"updatedAt"?: string;
	"categoryId"?: number
}