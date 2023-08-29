
// [do not edit,<auto-generated />]
// This file has been automatically generated, please do not change unless you disable auto-generation in the Makefile  

#include <spin.h>

namespace spin {
namespace encode {

using v8::String;
using v8::FunctionCallbackInfo;
using v8::Array;
using v8::Local;
using v8::ObjectTemplate;
using v8::Isolate;
using v8::Value;
using v8::Uint32Array;
using v8::ArrayBuffer;
using v8::Context;
using v8::Integer;
using v8::Function;
using v8::NewStringType;
using v8::Object;
using v8::BackingStore;
using v8::TryCatch;
using v8::ScriptCompiler;
using v8::Module;
using v8::FixedArray;
using v8::ScriptOrigin;
using v8::SharedArrayBuffer;
using v8::MaybeLocal;
using v8::HandleScope;
using v8::Promise;
using v8::Number;
using v8::StackTrace;
using v8::Message;
using v8::StackFrame;
using v8::Maybe;
using v8::FunctionTemplate;
using v8::FunctionCallback;
using v8::PromiseRejectMessage;
using v8::CFunction;
using v8::Global;
using v8::Exception;
using v8::CTypeInfo;
using v8::PropertyAttribute;
using v8::Signature;
using v8::ConstructorBehavior;
using v8::SideEffectType;
using v8::kPromiseRejectAfterResolved;
using v8::kPromiseResolveAfterResolved;
using v8::kPromiseHandlerAddedAfterReject;
using v8::Data;
using v8::PrimitiveArray;
using v8::TypedArray;
using v8::Uint8Array;
using v8::Boolean;
using v8::ModuleRequest;
using v8::CFunctionInfo;
using v8::OOMDetails;
using v8::V8;


const int8_t unhex_table[256] =
  { -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9, -1, -1, -1, -1, -1, -1,
    -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  };

inline unsigned unhex(uint8_t x) {
  return unhex_table[x];
}

size_t hex_encode (const char* src, size_t slen, char* dst, size_t dlen) {
  dlen = slen * 2;
  for (uint32_t i = 0, k = 0; k < dlen; i += 1, k += 2) {
    static const char hex[] = "0123456789abcdef";
    uint8_t val = (uint8_t)(src[i]);
    dst[k + 0] = hex[val >> 4];
    dst[k + 1] = hex[val & 15];
  }
  return dlen;
}

size_t hex_decode(char* buf,
                         size_t len,
                         const char* src,
                         const size_t srcLen) {
  size_t i;
  for (i = 0; i < len && i * 2 + 1 < srcLen; ++i) {
    unsigned a = unhex(src[i * 2 + 0]);
    unsigned b = unhex(src[i * 2 + 1]);
    if (!~a || !~b)
      return i;
    buf[i] = (a << 4) | b;
  }

  return i;
}



uint32_t hex_encodeFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1, struct FastApiTypedArray* const p2, uint32_t p3);
v8::CTypeInfo cargshex_encode[5] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
};
v8::CTypeInfo rchex_encode = v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
v8::CFunctionInfo infohex_encode = v8::CFunctionInfo(rchex_encode, 5, cargshex_encode);
v8::CFunction pFhex_encode = v8::CFunction((const void*)&hex_encodeFast, &infohex_encode);

uint32_t hex_decodeFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1, struct FastApiTypedArray* const p2, uint32_t p3);
v8::CTypeInfo cargshex_decode[5] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
};
v8::CTypeInfo rchex_decode = v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
v8::CFunctionInfo infohex_decode = v8::CFunctionInfo(rchex_decode, 5, cargshex_decode);
v8::CFunction pFhex_decode = v8::CFunction((const void*)&hex_decodeFast, &infohex_decode);



void hex_encodeSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  const char* v0 = reinterpret_cast<const char*>(ptr0);
  uint32_t v1 = Local<Integer>::Cast(args[1])->Value();
  Local<Uint8Array> u82 = args[2].As<Uint8Array>();
  uint8_t* ptr2 = (uint8_t*)u82->Buffer()->Data() + u82->ByteOffset();
  char* v2 = reinterpret_cast<char*>(ptr2);
  uint32_t v3 = Local<Integer>::Cast(args[3])->Value();
  uint32_t rc = hex_encode(v0, v1, v2, v3);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

uint32_t hex_encodeFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1, struct FastApiTypedArray* const p2, uint32_t p3) {
  const char* v0 = reinterpret_cast<const char*>(p0->data);
  uint32_t v1 = p1;
  char* v2 = reinterpret_cast<char*>(p2->data);
  uint32_t v3 = p3;
  return hex_encode(v0, v1, v2, v3);
}
void hex_decodeSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  char* v0 = reinterpret_cast<char*>(ptr0);
  uint32_t v1 = Local<Integer>::Cast(args[1])->Value();
  Local<Uint8Array> u82 = args[2].As<Uint8Array>();
  uint8_t* ptr2 = (uint8_t*)u82->Buffer()->Data() + u82->ByteOffset();
  const char* v2 = reinterpret_cast<const char*>(ptr2);
  uint32_t v3 = Local<Integer>::Cast(args[3])->Value();
  uint32_t rc = hex_decode(v0, v1, v2, v3);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

uint32_t hex_decodeFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1, struct FastApiTypedArray* const p2, uint32_t p3) {
  char* v0 = reinterpret_cast<char*>(p0->data);
  uint32_t v1 = p1;
  const char* v2 = reinterpret_cast<const char*>(p2->data);
  uint32_t v3 = p3;
  return hex_decode(v0, v1, v2, v3);
}

void Init(Isolate* isolate, Local<ObjectTemplate> target) {
  Local<ObjectTemplate> module = ObjectTemplate::New(isolate);
  SET_FAST_METHOD(isolate, module, "hex_encode", &pFhex_encode, hex_encodeSlow);
  SET_FAST_METHOD(isolate, module, "hex_decode", &pFhex_decode, hex_decodeSlow);

  SET_MODULE(isolate, target, "encode", module);
}
} // namespace encode
} // namespace spin

extern "C" {
  void* _register_encode() {
    return (void*)spin::encode::Init;
  }
}
