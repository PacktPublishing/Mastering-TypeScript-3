import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler, Context, Callback } from 'aws-lambda';

export const handler: Handler = (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    return new Promise<APIGatewayProxyResult>((resolve, reject) => {
        console.log(`event : ${JSON.stringify(event, null, 4)}`);
        resolve({
            statusCode: 200,
            body: JSON.stringify({
                message: 'TypeScript Serverless v1.0!',
                input: event,
            }, null, 4)
        });
    })
}