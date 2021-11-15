package zhttp.service.server

import io.netty.channel.{ChannelHandler, ChannelHandlerContext, SimpleChannelInboundHandler}
import io.netty.handler.codec.http.{HttpMessage, HttpServerKeepAliveHandler}
import io.netty.handler.flow.FlowControlHandler
import zhttp.service.Server.Settings
import zhttp.service.{FLOW_CONTROL_HANDLER, HTTP_KEEPALIVE_HANDLER, HTTP_REQUEST_HANDLER}

final case class ClearTextHttp2FallbackServerHandler[R](httpH: ChannelHandler, settings: Settings[R, Throwable])
    extends SimpleChannelInboundHandler[HttpMessage]() {
  @throws[Exception]
  override protected def channelRead0(ctx: ChannelHandlerContext, msg: HttpMessage): Unit = { // If this handler is hit then no upgrade has been attempted and the client is just talking HTTP.
    val pipeline = ctx.pipeline
    val thisCtx  = pipeline.context(this)
    pipeline
      .addAfter(thisCtx.name(), FLOW_CONTROL_HANDLER, new FlowControlHandler())
      .addAfter(FLOW_CONTROL_HANDLER, HTTP_REQUEST_HANDLER, httpH)
      .replace(this, HTTP_KEEPALIVE_HANDLER, new HttpServerKeepAliveHandler)
    ctx.fireChannelRead(msg)
    ()
  }
}