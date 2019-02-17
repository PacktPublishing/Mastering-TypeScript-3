import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler, Context, Callback } from 'aws-lambda';
import * as HttpStatusCodes from 'http-status-codes';


export const postHandler: Handler =
    (event: APIGatewayProxyEvent, context: Context):
        Promise<APIGatewayProxyResult> => {
        return new Promise<APIGatewayProxyResult>((resolve, reject) => {
            console.log(`event.body : ${JSON.stringify(event.body)}`);
            resolve({
                statusCode: HttpStatusCodes.OK,
                body: JSON.stringify({
                    message: 'TypeScript Serverless POST executed successfully!',
                    bodyReceived: event.body
                }, null, 4)
            });
        })
    }