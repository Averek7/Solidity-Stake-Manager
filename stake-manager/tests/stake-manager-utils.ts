import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddressTagged,
  BurnedFromStake,
  SpecialCallerSet,
  Staked,
  Unstaked
} from "../generated/StakeManager/StakeManager"

export function createAddressTaggedEvent(
  addr: Address,
  source: string
): AddressTagged {
  let addressTaggedEvent = changetype<AddressTagged>(newMockEvent())

  addressTaggedEvent.parameters = new Array()

  addressTaggedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  addressTaggedEvent.parameters.push(
    new ethereum.EventParam("source", ethereum.Value.fromString(source))
  )

  return addressTaggedEvent
}

export function createBurnedFromStakeEvent(
  who: Address,
  amount: BigInt
): BurnedFromStake {
  let burnedFromStakeEvent = changetype<BurnedFromStake>(newMockEvent())

  burnedFromStakeEvent.parameters = new Array()

  burnedFromStakeEvent.parameters.push(
    new ethereum.EventParam("who", ethereum.Value.fromAddress(who))
  )
  burnedFromStakeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return burnedFromStakeEvent
}

export function createSpecialCallerSetEvent(caller: Address): SpecialCallerSet {
  let specialCallerSetEvent = changetype<SpecialCallerSet>(newMockEvent())

  specialCallerSetEvent.parameters = new Array()

  specialCallerSetEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )

  return specialCallerSetEvent
}

export function createStakedEvent(who: Address, amount: BigInt): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("who", ethereum.Value.fromAddress(who))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakedEvent
}

export function createUnstakedEvent(who: Address, amount: BigInt): Unstaked {
  let unstakedEvent = changetype<Unstaked>(newMockEvent())

  unstakedEvent.parameters = new Array()

  unstakedEvent.parameters.push(
    new ethereum.EventParam("who", ethereum.Value.fromAddress(who))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unstakedEvent
}
