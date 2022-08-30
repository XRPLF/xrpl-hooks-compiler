// for !HAS_CALLBACK
export const PREPARE_PAYMENT_SIMPLE_SIZE = 248;

export const ttPAYMENT: u8 = 0;
export const tfCANONICAL: u32 = 0x80000000;

export const atACCOUNT: u8 = 1;
export const atDESTINATION: u8 = 3;

export const amAMOUNT: u8 = 1;
export const amFEE: u8 = 8;

@inline export function TRACESTR(text: string): void {
    trace_("", 0, text, text.length * 2, 0)
}

@inline export function IS_BUFFER_EQUAL(buf1: i32, buf2: i32, len: i32, gid: i32): bool {
    for (var i = 0; _g(gid, len + 1), i < len; ++i) {
	if (load<u8>(buf1 + i) != load<u8>(buf2 + i)) {
	    return false;
	}
    }

    return true;
}

@inline export function AMOUNT_TO_DROPS(amount_buffer: u32): i64 {
     return (load<u8>(amount_buffer) >> 7) ? -2 : (
	 (((load<u8>(amount_buffer) as u64) & 0xb00111111) << 56) +
	     ((load<u8>(amount_buffer + 1) as u64) << 48) +
	     ((load<u8>(amount_buffer + 2) as u64) << 40) +
	     ((load<u8>(amount_buffer + 3) as u64)) << 32) +
	     ((load<u8>(amount_buffer + 4) as u64) << 24) +
	     ((load<u8>(amount_buffer + 5) as u64) << 16) +
	     ((load<u8>(amount_buffer + 6) as u64) <<  8) +
	     ((load<u8>(amount_buffer + 7) as u64));
}

@inline export function ENCODE_TT(buf: u32, utt: u8): u32 {
    store<u8>(buf, 0x12);
    store<u8>(buf + 1, 0);
    store<u8>(buf + 2, utt);
    return buf + 3;
}

@inline export function ENCODE_UINT32_COMMON(buf: u32, ui: u32, uf: u8): u32 {
    store<u8>(buf, 0x20 + (uf & 0x0F));
    store<u8>(buf + 1, (ui >> 24) & 0xFF);
    store<u8>(buf + 2, (ui >> 16) & 0xFF);
    store<u8>(buf + 3, (ui >> 8) & 0xFF);
    store<u8>(buf + 4, ui & 0xFF);
    return buf + 5;
}

@inline export function ENCODE_UINT32_UNCOMMON(buf: u32, ui: u32, uf: u8): u32 {
    store<u8>(buf, 0x20);
    store<u8>(buf + 1, uf);
    store<u8>(buf + 2, (ui >> 24) & 0xFF);
    store<u8>(buf + 3, (ui >> 16) & 0xFF);
    store<u8>(buf + 4, (ui >> 8) & 0xFF);
    store<u8>(buf + 5, ui & 0xFF);
    return buf + 6;
}

@inline export function ENCODE_DROPS(buf: u32, udrops: u64, uat: u8): u32 {
    store<u8>(buf, 0x60 + (uat & 0x0F));
    store<u8>(buf + 1, 0x40 + ((udrops >> 56) & 0x3F));
    store<u8>(buf + 2, (udrops >> 48) & 0xFF);
    store<u8>(buf + 3, (udrops >> 40) & 0xFF);
    store<u8>(buf + 4, (udrops >> 32) & 0xFF);
    store<u8>(buf + 5, (udrops >> 24) & 0xFF);
    store<u8>(buf + 6, (udrops >> 16) & 0xFF);
    store<u8>(buf + 7, (udrops >> 8) & 0xFF);
    store<u8>(buf + 8, udrops & 0xFF);
    return buf + 9;
}

@inline export function ENCODE_ACCOUNT(buf: u32, account_id: u32, uat: u8): u32 {
    store<u8>(buf, 0x80 + uat);
    store<u8>(buf + 1, 0x14);
    store<u64>(buf + 2, load<u64>(account_id));
    store<u64>(buf + 10, load<u64>(account_id + 8));
    store<u32>(buf + 18, load<u32>(account_id + 16));
    return buf + 22;
}

@inline export function _01_02_ENCODE_TT(buf: u32, tt: u8): u32 {
    return ENCODE_TT(buf, tt);
}

@inline export function _02_02_ENCODE_FLAGS(buf: u32, tag: u32): u32 {
    return ENCODE_UINT32_COMMON(buf, tag, 0x2);
}

@inline export function _02_03_ENCODE_TAG_SRC(buf: u32, tag: u32): u32 {
    return ENCODE_UINT32_COMMON(buf, tag, 0x3);
}

@inline export function _02_04_ENCODE_SEQUENCE(buf: u32, sequence: u32): u32 {
    return ENCODE_UINT32_COMMON(buf, sequence, 0x4);
}

@inline export function _02_14_ENCODE_TAG_DST(buf: u32, tag: u32): u32 {
    return ENCODE_UINT32_COMMON(buf, tag, 0xE);
}

@inline export function _02_26_ENCODE_FLS(buf: u32, fls: u32): u32 {
    return ENCODE_UINT32_UNCOMMON(buf, fls, 0x1A);
}

@inline export function _02_27_ENCODE_LLS(buf: u32, lls: u32): u32 {
    return ENCODE_UINT32_UNCOMMON(buf, lls, 0x1B);
}

@inline export function _06_01_ENCODE_DROPS_AMOUNT(buf: u32, drops: u64): u32 {
    return ENCODE_DROPS(buf, drops, amAMOUNT);
}

@inline export function _06_08_ENCODE_DROPS_FEE(buf: u32, drops: u64): u32 {
    return ENCODE_DROPS(buf, drops, amFEE);
}

// bug-for-bug compatible w/ ENCODE_SIGNING_PUBKEY_NULL in macro.h
@inline export function _07_03_ENCODE_SIGNING_PUBKEY_NULL(buf: u32): u32 {
    store<u8>(buf, 0x73);
    store<u8>(buf + 1, 0x21);
    store<u64>(buf + 2, 0);
    store<u64>(buf + 10, 0);
    store<u64>(buf + 18, 0);
    store<u64>(buf + 25, 0);
    return buf + 35;
}

@inline export function _08_01_ENCODE_ACCOUNT_SRC(buf: u32, account_id: u32): u32 {
    return ENCODE_ACCOUNT(buf, account_id, atACCOUNT);
}

@inline export function _08_03_ENCODE_ACCOUNT_DST(buf: u32, account_id: u32): u32 {
    return ENCODE_ACCOUNT(buf, account_id, atDESTINATION);
}

@inline export function PREPARE_PAYMENT_SIMPLE(buf_out_master: u32, drops_amount: u64, to_address: u32, dest_tag: u32, src_tag: u32): void {
    var buf_out = buf_out_master;
    const acc = memory.data(20) as u32;
    const cls = ledger_seq() as u32;
    hook_account(acc, 20);
    buf_out = _01_02_ENCODE_TT(buf_out, ttPAYMENT);
    buf_out = _02_02_ENCODE_FLAGS(buf_out, tfCANONICAL);
    buf_out = _02_03_ENCODE_TAG_SRC(buf_out, src_tag);
    buf_out = _02_04_ENCODE_SEQUENCE(buf_out, 0);
    buf_out = _02_14_ENCODE_TAG_DST(buf_out, dest_tag);
    buf_out = _02_26_ENCODE_FLS(buf_out, cls + 1);
    buf_out = _02_27_ENCODE_LLS(buf_out, cls + 5);
    buf_out = _06_01_ENCODE_DROPS_AMOUNT(buf_out, drops_amount);
    var fee_ptr = buf_out;
    buf_out = _06_08_ENCODE_DROPS_FEE(buf_out, 0);
    buf_out = _07_03_ENCODE_SIGNING_PUBKEY_NULL(buf_out);
    buf_out = _08_01_ENCODE_ACCOUNT_SRC(buf_out, acc);
    buf_out = _08_03_ENCODE_ACCOUNT_DST(buf_out, to_address);
    etxn_details(buf_out, PREPARE_PAYMENT_SIMPLE_SIZE);
    var fee = etxn_fee_base(buf_out_master, PREPARE_PAYMENT_SIMPLE_SIZE);
    _06_08_ENCODE_DROPS_FEE(fee_ptr, fee);
}
