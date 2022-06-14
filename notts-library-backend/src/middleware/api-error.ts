class ApiError {
	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}

	code: number;
	message: string;

	static BadRequest(msg: string) {
		return new ApiError(400, msg);
	}

	static Internal(msg: string) {
		return new ApiError(500, msg);
	}
}

export default ApiError;
