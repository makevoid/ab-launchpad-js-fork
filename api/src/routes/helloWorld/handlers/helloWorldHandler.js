'use strict'

const { web3 } = require('../../../util/web3')

const getHelloWorld = async ctx => {
  ctx.logger.info(' -> HelloWorld.getHelloWorld()')
  const blockNumber = await web3.eth.getBlockNumber()
  const helloWorldString = `hello world! - block: ${blockNumber}`
  ctx.logger.info(` <- HelloWorld.getHelloWorld() - ${JSON.stringify(helloWorldString)}`)

  ctx.ok({ message: helloWorldString })
}

const setHelloWorld = async ctx => {
  const { message } = ctx.request.body

  const { HelloWorld } = contracts

  ctx.logger.info(` -> HelloWorld.updateHelloWorld(message) - message: ${JSON.stringify(message)}`)
  const receipt = await HelloWorld.methods.updateHelloWorld(message).send()
  ctx.logger.info(` -> HelloWorld.updateHelloWorld(message) - success: ${receipt.status}`)

  ctx.ok({ success: receipt.status })
}

module.exports = {
  getHelloWorld,
  setHelloWorld
}
