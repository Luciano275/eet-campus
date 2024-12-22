export default async function OpenMessage(
  props
  : {
    params: Promise<{
      'message-id': string
    }>
  }
) {

  const params = await props.params;
  const messageId = params['message-id'];

  return (
    <div>
      <h1>Message {messageId}</h1>
    </div>
  )
}