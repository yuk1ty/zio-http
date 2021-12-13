package zhttp.service.client

import io.netty.channel.{Channel, ChannelHandler, ChannelInitializer, ChannelPipeline}
import io.netty.handler.codec.http.{HttpClientCodec, HttpObjectAggregator}
import zhttp.service.client.ClientSSLHandler.ClientSSLOptions
import zhttp.service.{HTTP_CLIENT_CODEC, OBJECT_AGGREGATOR}

final case class ClientChannelInitializer[R](
  channelHandler: ChannelHandler,
  scheme: String,
  sslOption: ClientSSLOptions = ClientSSLOptions.DefaultSSL,
) extends ChannelInitializer[Channel]() {
  override def initChannel(ch: Channel): Unit = {
    val p: ChannelPipeline = ch
      .pipeline()
      .addLast(HTTP_CLIENT_CODEC, new HttpClientCodec)
      .addLast(OBJECT_AGGREGATOR, new HttpObjectAggregator(Int.MaxValue))
      .addLast(channelHandler)

    if (scheme == "https") {
      p.addFirst(ClientSSLHandler.ssl(sslOption).newHandler(ch.alloc))
    }
    ()
  }
}
