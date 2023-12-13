/**
 *
 */
#include "hookapi.h"

int64_t hook(uint32_t reserved) {

    TRACESTR("Base.c: Called.");
    accept (0,0,0); 

    _g(1,1);
    // unreachable
    return 0;
}