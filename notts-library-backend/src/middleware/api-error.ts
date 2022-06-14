class ApiError {
	constructor(code: number, message: any) {
		this.code = code;
		this.message = message;
	}

	code: number;
	message: any;

	static BadRequest(message: any) {
		return new ApiError(400, message);
	}

	static Internal(message: any) {
		return new ApiError(500, message);
	}
}

export default ApiError;
