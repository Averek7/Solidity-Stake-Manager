import {
  AddressTagged as AddressTaggedEvent,
  BurnedFromStake as BurnedFromStakeEvent,
  SpecialCallerSet as SpecialCallerSetEvent,
  Staked as StakedEvent,
  Unstaked as UnstakedEvent
} from "../generated/StakeManager/StakeManager"
import {
  AddressTagged,
  BurnedFromStake,
  SpecialCallerSet,
  Staked,
  Unstaked
} from "../generated/schema"

export function handleAddressTagged(event: AddressTaggedEvent): void {
  let entity = new AddressTagged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.addr = event.params.addr
  entity.source = event.params.source

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBurnedFromStake(event: BurnedFromStakeEvent): void {
  let entity = new BurnedFromStake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.who = event.params.who
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSpecialCallerSet(event: SpecialCallerSetEvent): void {
  let entity = new SpecialCallerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStaked(event: StakedEvent): void {
  let entity = new Staked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.who = event.params.who
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnstaked(event: UnstakedEvent): void {
  let entity = new Unstaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.who = event.params.who
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
