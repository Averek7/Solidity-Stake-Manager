import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddressTagged } from "../generated/schema"
import { AddressTagged as AddressTaggedEvent } from "../generated/StakeManager/StakeManager"
import { handleAddressTagged } from "../src/stake-manager"
import { createAddressTaggedEvent } from "./stake-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let source = "Example string value"
    let newAddressTaggedEvent = createAddressTaggedEvent(addr, source)
    handleAddressTagged(newAddressTaggedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("AddressTagged created and stored", () => {
    assert.entityCount("AddressTagged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddressTagged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddressTagged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "source",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
