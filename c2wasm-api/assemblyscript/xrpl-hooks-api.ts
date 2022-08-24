/**
 * Guard function. Each time a loop appears in your code a call to this must be the first branch instruction after the
 * beginning of the loop.
 * @param id The identifier of the guard (typically the line number).
 * @param maxiter The maximum number of times this loop will iterate across the life of the hook.
 * @return Can be ignored. If the guard is violated the hook will terminate.
 */
@external('env', '_g')
export declare function _g(id: i32, maxiter: i32): i32

/**
 * Accept the originating transaction and commit all hook state changes and submit all emitted transactions.
 * @param read_ptr An optional string to use as a return comment. May be 0.
 * @param read_len The length of the string. May be 0.
 * @return Will never return, terminates the hook.
 */
@external('env', 'accept')
export declare function accept(read_ptr: string, read_len: i32, error_code: i64): i64

/**
 * Rollback the originating transaction, discard all hook state changes and emitted transactions.
 * @param read_ptr An optional string to use as a return comment. May be 0.
 * @param read_len The length of the string. May be 0.
 * @return Will never return, terminates the hook.
 */
@external('env', 'rollback')
export declare function rollback(read_ptr: string, read_len: i32, error_code: i64): i64

/**
 * Read a 20 byte account-id from the memory pointed to by read_ptr of length read_len and encode it to a base58-check
 * encoded r-address.
 * @param read_ptr The memory address of the account-id
 * @param read_len The byte length of the account-id (should always be 20)
 * @param write_ptr The memory address of a suitable buffer to write the encoded r-address into.
 * @param write_len The size of the write buffer.
 * @return On success the length of the r-address will be returned indicating the bytes written to the write buffer.
 *         On failure a negative integer is returned indicating what went wrong.
 */
@external('env', 'util_raddr')
export declare function util_raddr(write_ptr: i32, write_len: i32, read_ptr: i32, read_len: i32): i64

/**
 * Read an r-address from the memory pointed to by read_ptr of length read_len and decode it to a 20 byte account id
 * and write to write_ptr
 * @param read_ptr The memory address of the r-address
 * @param read_len The byte length of the r-address
 * @param write_ptr The memory address of a suitable buffer to write the decoded account id into.
 * @param write_len The size of the write buffer.
 * @return On success 20 will be returned indicating the bytes written. On failure a negative integer is returned
 *         indicating what went wrong.
 */
@external('env', 'util_accid')
export declare function util_accid(write_ptr: i32, write_len: i32, read_ptr: i32, read_len: i32): i64

/**
 * Verify a cryptographic signature either ED25519 of SECP256k1. Public key should be prefixed with 0xED for 25519.
 * @param dread_ptr The memory location of the data or payload to verify
 * @param dread_len The length of the data or payload to verify
 * @param sread_ptr The memory location of the signature
 * @param sread_len The length of the signature
 * @param kread_ptr The memory location of the public key
 * @param kread_len The length of the public key
 * @return True if and only if the signature was verified.
 */
@external('env', 'util_verify')
export declare function util_verify(dread_ptr: i32, dread_len: i32, sread_ptr: i32, sread_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Compute the first half of a SHA512 checksum.
 * @param write_ptr The buffer to write the checksum into. Must be at least 32 bytes.
 * @param write_len The length of the buffer.
 * @param read_ptr  The buffer to read data for digest from.
 * @param read_len  The amount of data to read from the buffer.
 * @return The number of bytes written to write_ptr or a negative integer on error.
 */
@external('env', 'util_sha512h')
export declare function util_sha512h(write_ptr: i32, write_len: i32, read_ptr: i32,  read_len: i32): i64

/**
 * Index into a xrpld serialized object and return the location and length of a subfield. Except for Array subtypes
 * the offset and length refer to the **payload** of the subfield not the entire subfield. Use SUB_OFFSET and
 * SUB_LENGTH macros to extract return value.
 * @param read_ptr The memory location of the stobject
 * @param read_len The length of the stobject
 * @param field_id The Field Code of the subfield
 * @return high-word (most significant 4 bytes excluding the most significant bit (MSB)) is the field offset relative
 *         to read_ptr and the low-word (least significant 4 bytes) is its length. MSB is sign bit, if set (negative)
 *         return value indicates error (typically error means could not find.)
 */
@external('env', 'sto_subfield')
export declare function sto_subfield(read_ptr: i32, read_len: i32, field_id: i32): i64


/**
 * Index into a xrpld serialized array and return the location and length of an index. Unlike sto_subfield this api
 * always returns the offset and length of the whole object at that index (not its payload.) Use SUB_OFFSET and
 * SUB_LENGTH macros to extract return value.
 * @param read_ptr The memory location of the stobject
 * @param read_len The length of the stobject
 * @param array_id The index requested
 * @return high-word (most significant 4 bytes excluding the most significant bit (MSB)) is the field offset relative
 *         to read_ptr and the low-word (least significant 4 bytes) is its length. MSB is sign bit, if set (negative)
 *         return value indicates error (typically error means could not find.)
 */
@external('env', 'sto_subarray')
export declare function sto_subarray(read_ptr: i32,  read_len: i32, array_id: i32): i64

@external('env', 'sto_validate')
export declare function sto_validate(read_ptr: i32,  read_len: i32): i64

@external('env', 'sto_emplace')
export declare function sto_emplace(write_ptr: i32, write_len: i32, sread_ptr: i32, sread_len: i32, fread_ptr: i32, fread_len: i32, field_id: i32): i64

@external('env', 'sto_erase')
export declare function sto_erase(write_ptr: i32,  write_len: i32, read_ptr: i32, read_len: i32, field_id: i32): i64

@external('env', 'util_keylet')
export declare function util_keylet(write_ptr: i32, write_len: i32, keylet_type: i32, a: i32, b: i32, c: i32, d: i32, e: i32, f: i32): i64

/**
 * Compute burden for an emitted transaction.
 * @return the burden a theoretically emitted transaction would have.
 */
@external('env', 'etxn_burden')
export declare function etxn_burden(): i64

/**
 * Write a full emit_details stobject into the buffer specified.
 * @param write_ptr A sufficiently large buffer to write into.
 * @param write_len The length of that buffer.
 * @return The number of bytes written or a negative integer indicating an error.
 */
@external('env', 'etxn_details')
export declare function etxn_details(write_ptr: i32, write_len: i32): i64

/**
 * Compute the minimum fee required to be paid by a hypothetically emitted transaction based on its size in bytes.
 * @return The minimum fee in drops this transaction should pay to succeed
 */
@external('env', 'etxn_fee_base')
export declare function etxn_fee_base(read_ptr: i32, read_len: i32): i64

/**
 * Inform xrpld that you will be emitting at most @count@ transactions during the course of this hook execution.
 * @param count The number of transactions you intend to emit from this  hook.
 * @return If a negaitve integer an error has occured
 */
@external('env', 'etxn_reserve')
export declare function etxn_reserve(count: i32): i64

/**
 * Compute the generation of an emitted transaction. If this hook was invoked by a transaction emitted by a previous
 * hook then the generation counter will be 1+ the previous generation counter otherwise it will be 1.
 * @return The generation of a hypothetically emitted transaction.
 */
@external('env', 'etxn_generation')
export declare function etxn_generation(): i64

/**
 * Emit a transaction from this hook.
 * @param read_ptr Memory location of a buffer containing the fully formed binary transaction to emit.
 * @param read_len The length of the transaction.
 * @return A negative integer if the emission failed.
 */
 @external('env', 'emit')
export declare function emit(write_ptr: i32, write_len: i32, read_ptr: i32, read_len: i32): i64

/**
 * Retrieve the account the hook is running on.
 * @param write_ptr A buffer of at least 20 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'hook_account')
export declare function hook_account(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve the hash of the currently executing hook.
 * @param write_ptr A buffer of at least 32 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'emhook_hashit')
export declare function hook_hash(write_ptr: i32, write_len: i32): i64

/**
 * Retrive the currently recommended minimum fee for a transaction to succeed.
 */
@external('env', 'fee_base')
export declare function fee_base(): i64

/**
 * Retrieve the current ledger sequence number
 */
@external('env', 'ledger_seq')
export declare function ledger_seq(): i64

@external('env', 'ledger_last_hash')
export declare function ledger_last_hash(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve a nonce for use in an emitted transaction (or another task). Can be called repeatedly for multiple nonces.
 * @param write_ptr A buffer of at least 32 bytes to write into.
 * @param write_len The length of that buffer
 * @return The number of bytes written into the buffer of a negative integer if an error occured.
 */
@external('env', 'nonce')
export declare function nonce(write_ptr: i32, write_len: i32): i64


/**
 * Slot functions have not been implemented yet and the api for them is subject to change
 */
@external('env', 'slot')
export declare function slot(write_ptr: i32, write_len: i32, slot: i32): i64

@external('env', 'slot_clear')
export declare function slot_clear(slot: i32): i64

@external('env', 'slot_count')
export declare function slot_count(slot: i32): i64

@external('env', 'slot_id')
export declare function slot_id(slot: i32): i64

@external('env', 'slot_set')
export declare function slot_set(read_ptr: i32, read_len: i32, slot: i32): i64

@external('env', 'slot_size')
export declare function slot_size(slot: i32): i64

@external('env', 'slot_subarray')
export declare function slot_subarray(parent_slot: i32, array_id: i32, new_slot: i32): i64

@external('env', 'slot_subfield')
export declare function slot_subfield(parent_slot: i32, field_id: i32, new_slot: i32): i64

@external('env', 'slot_type')
export declare function slot_type(slot: i32, flags: i32): i64

@external('env', 'slot_float')
export declare function slot_float(slot: i32): i64

@external('env', 'trace_slot')
export declare function trace_slot(mread_ptr: i32, mread_len: i32, slot: i32): i64

@external('env', 'otxn_slot')
export declare function otxn_slot(slot: i32): i64


/**
 * In the hook's state key-value map, set the value for the key pointed at by kread_ptr.
 * @param read_ptr A buffer containing the data to store
 * @param read_len The length of the data
 * @param kread_ptr A buffer containing the key
 * @param kread_len The length of the key
 * @return The number of bytes stored or a negative integer if an error occured
 */
@external('env', 'state_set')
export declare function state_set(read_ptr: i32, read_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Retrieve a value from the hook's key-value map.
 * @param write_ptr A buffer to write the state value into
 * @param write_len The length of that buffer
 * @param kread_ptr A buffer to read the state key from
 * @param kread_len The length of that key
 * @return The number of bytes written or a negative integer if an error occured.
 */
@external('env', 'state')
export declare function state(write_ptr: i32, write_len: i32, kread_ptr: i32, kread_len: i32): i64

/**
 * Retrieve a value from another hook's key-value map.
 * @param write_ptr A buffer to write the state value into
 * @param write_len The length of that buffer
 * @param kread_ptr A buffer to read the state key from
 * @param kread_len The length of that key
 * @param aread_ptr A buffer containing an account-id of another account containing a hook whose state we are reading
 * @param aread_len The length of the account-id (should always be 20).
 * @return The number of bytes written or a negative integer if an error occured.
 */
@external('env', 'state_foreign')
export declare function state_foreign(write_ptr: i32, write_len: i32, kread_ptr: i32, kread_len: i32, aread_ptr: i32,  aread_len: i32): i64

/**
 * Print some output to the trace log on xrpld. Any xrpld instance set to "trace" log level will see this.
 * @param read_ptr A buffer containing either data or text (in either utf8, or utf16le)
 * @param read_len The byte length of the data/text to send to the trace log
 * @param as_hex If 0 treat the read_ptr as pointing at a string of text, otherwise treat it as data and print hex
 * @return The number of bytes output or a negative integer if an error occured.
 */
@external('env', 'trace')
export declare function trace_(mread_ptr: string, mread_len: i32, dread_ptr: string, dread_len: i32, as_hex: i32): i64

/**
 * Print some output to the trace log on xrpld along with a decimal number. Any xrpld instance set to "trace" log
 * level will see this.
 * @param read_ptr A pointer to the string to output
 * @param read_len The length of the string to output
 * @param number Any integer you wish to display after the text
 * @return A negative value on error
 */
@external('env', 'trace_num')
export declare function trace_num(read_ptr: string, read_len: i32, number: i64): i64

/**
 * Retrieve the burden of the originating transaction (if any)
 * @return The burden of the originating transaction
 */
@external('env', 'otxn_burden')
export declare function otxn_burden(): i64

/**
 * Retrieve a field from the originating transaction as "full text" (The way it is displayed in JSON)
 * @param write_ptr A buffer to write the representation into
 * @param write_len The length of the buffer
 * @param field_id The field code of the field being requested
 * @return The number of bytes written to write_ptr or a negative integer if an error occured.
 */
@external('env', 'otxn_field_txt')
export declare function otxn_field_txt(write_ptr: i32, write_len: i32, field_id: i32): i64

/**
 * Retrieve a field from the originating transaction in its raw serialized form.
 * @param write_ptr A buffer to output the field into
 * @param write_len The length of the buffer.
 * @param field_if The field code of the field being requested
 * @return The number of bytes written to write_ptr or a negative integer if an error occured.
 */
@external('env', 'otxn_field')
export declare function otxn_field(write_ptr: i32, write_len: i32, field_id: i32): i64

/**
 * Retrieve the generation of the originating transaction (if any).
 * @return the generation of the originating transaction.
 */
@external('env', 'otxn_generation')
export declare function otxn_generation(): i64

/**
 * Retrieve the TXNID of the originating transaction.
 * @param write_ptr A buffer at least 32 bytes long
 * @param write_len The length of the buffer.
 * @return The number of bytes written into the buffer or a negative integer on failure.
 */
@external('env', 'otxn_id')
export declare function otxn_id(write_ptr: i32, write_len: i32): i64

/**
 * Retrieve the Transaction Type (e.g. ttPayment = 0) of the originating transaction.
 * @return The Transaction Type (tt-code)
 */
@external('env', 'otxn_type')
export declare function otxn_type(): i64

@external('env', 'float_set')
export declare function float_set(exponent: i32, mantissa: i64): i64

@external('env', 'float_multiply')
export declare function float_multiply(float1: i64, float2: i64): i64

@external('env', 'float_mulratio')
export declare function float_mulratio(float1: i64, round_up: i32, numerator: i32, denominator: i32): i64

@external('env', 'float_negate')
export declare function float_negate(float1: i64): i64

@external('env', 'float_compare')
export declare function float_compare(float1: i64, float2: i64, mode: i32): i64

@external('env', 'float_sum')
export declare function float_sum(float1: i64, float2: i64): i64

@external('env', 'float_sto')
export declare function float_sto(write_ptr: i32, write_len: i32, cread_ptr: i32, cread_len: i32, iread_ptr: i32, iread_le: i32n, float1: i64, field_code: i32): i64

@external('env', 'float_sto_set')
export declare function float_sto_set(read_ptr: i32, read_len: i32): i64

@external('env', 'float_invert')
export declare function float_invert(float1: i64): i64

@external('env', 'float_divide')
export declare function float_divide(float1: i64, float2: i64): i64

@external('env', 'float_one')
export declare function float_one(): i64

@external('env', 'float_exponent')
export declare function float_exponent(float1: i64): i64

@external('env', 'float_exponent_set')
export declare function float_exponent_set(float1: i64, exponent: i32): i64

@external('env', 'float_mantissa')
export declare function float_mantissa(float1: i64): i64

@external('env', 'float_mantissa_set')
export declare function float_mantissa_set(float1: i64, mantissa: i64): i64

@external('env', 'float_sign')
export declare function float_sign(float1: i64): i64

@external('env', 'float_sign_set')
export declare function float_sign_set(float1: i64, negative: i32): i64

@external('env', 'float_int')
export declare function float_int(float1: i64, decimal_places: i32, abs: i32): i64

@external('env', 'trace_float')
export declare function trace_float(mread_ptr: i32, mread_len: i32, float1: i64): i64

const SUCCESS = 0                  // return codes > 0 are reserved for hook apis to return "success"
const OUT_OF_BOUNDS = -1           // could not read or write to a pointer to provided by hook
const INTERNAL_ERROR = -2          // eg directory is corrupt
const TOO_BIG = -3                 // something you tried to store was too big
const TOO_SMALL = -4               // something you tried to store or provide was too small
const DOESNT_EXIST = -5            // something you requested wasn't found
const NO_FREE_SLOTS = -6           // when trying to load an object there is a maximum of 255 slots
const INVALID_ARGUMENT = -7        // self explanatory
const ALREADY_SET = -8             // returned when a one-time parameter was already set by the hook
const PREREQUISITE_NOT_MET = -9    // returned if a required param wasn't set before calling
const FEE_TOO_LARGE = -10          // returned if the attempted operation would result in an absurd fee
const EMISSION_FAILURE = -11       // returned if an emitted tx was not accepted by rippled
const TOO_MANY_NONCES = -12        // a hook has a maximum of 256 nonces
const TOO_MANY_EMITTED_TXN = -13   // a hook has emitted more than its stated number of emitted txn
const NOT_IMPLEMENTED = -14        // an api was called that is reserved for a future version
const INVALID_ACCOUNT = -15        // an api expected an account id but got something else
const GUARD_VIOLATION = -16        // a guarded loop or function iterated over its maximum
const INVALID_FIELD = -17          // the field requested is returning sfInvalid
const PARSE_ERROR = -18            // hook asked hookapi to parse something the contents of which was invalid
const RC_ROLLBACK = -19            // used internally by hook api to indicate a rollback
const RC_ACCEPT = -20              // used internally by hook api to indicate an accept
const NO_SUCH_KEYLET = -21         // the specified keylet or keylet type does not exist or could not be computed

const INVALID_FLOAT = -10024       // if the mantissa or exponent are outside normalized ranges

const KEYLET_HOOK = 1
const KEYLET_HOOK_STATE = 2
const KEYLET_ACCOUNT = 3
const KEYLET_AMENDMENTS = 4
const KEYLET_CHILD = 5
const KEYLET_SKIP = 6
const KEYLET_FEES = 7
const KEYLET_NEGATIVE_UNL = 8
const KEYLET_LINE = 9
const KEYLET_OFFER = 10
const KEYLET_QUALITY = 11
const KEYLET_EMITTED_DIR = 12
const KEYLET_TICKET = 13
const KEYLET_SIGNERS = 14
const KEYLET_CHECK = 15
const KEYLET_DEPOSIT_PREAUTH = 16
const KEYLET_UNCHECKED = 17
const KEYLET_OWNER_DIR = 18
const KEYLET_PAGE = 19
const KEYLET_ESCROW = 20
const KEYLET_PAYCHAN = 21
const KEYLET_EMITTED = 22

const COMPARE_EQUAL = '1U'
const COMPARE_LESS = '2U'
const COMPARE_GREATER = '4U'
