
// [do not edit,<auto-generated />]
// This file has been automatically generated, please do not change unless you disable auto-generation in the Makefile  
#include <ffi.h>
#include <spin.h>

namespace spin {
namespace ffi {

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


typedef void (*callback)();

struct foreignFunction {
  void* fast;
  void* ffi;
  void** values;
  void* start;
  v8::CFunction* cfunc;
  ffi_cif* cif;
  FastTypes rc;
  FastTypes* params;
  int nargs;
};

inline uint8_t needsunwrap (spin::FastTypes t) {
  if (t == spin::FastTypes::buffer) return 1;
  if (t == spin::FastTypes::u32array) return 1;
  if (t == spin::FastTypes::pointer) return 1;
  if (t == spin::FastTypes::u64) return 1;
  if (t == spin::FastTypes::i64) return 1;
  return 0;
}

v8::CTypeInfo* CTypeFromV8 (uint8_t v8Type) {
  if (v8Type == spin::FastTypes::boolean) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kBool);
  if (v8Type == spin::FastTypes::i8) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
  if (v8Type == spin::FastTypes::i16) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
  if (v8Type == spin::FastTypes::i32) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
  if (v8Type == spin::FastTypes::u8) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
  if (v8Type == spin::FastTypes::u16) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
  if (v8Type == spin::FastTypes::u32) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
  if (v8Type == spin::FastTypes::f32) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kFloat32);
  if (v8Type == spin::FastTypes::f64) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kFloat64);
  if (v8Type == spin::FastTypes::i64) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kInt64);
  if (v8Type == spin::FastTypes::u64) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint64);
  if (v8Type == spin::FastTypes::iSize) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kInt64);
  if (v8Type == spin::FastTypes::uSize) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint64);
  if (v8Type == spin::FastTypes::pointer) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint64);
  if (v8Type == spin::FastTypes::function) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint64);
  if (v8Type == spin::FastTypes::string) 
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kSeqOneByteString);
  if (v8Type == spin::FastTypes::buffer) {
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, 
      v8::CTypeInfo::SequenceType::kIsTypedArray, v8::CTypeInfo::Flags::kNone);
  }
  if (v8Type == spin::FastTypes::u32array) {
    return new v8::CTypeInfo(v8::CTypeInfo::Type::kUint32, 
      v8::CTypeInfo::SequenceType::kIsTypedArray, v8::CTypeInfo::Flags::kNone);
  }
  return new v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);  
}

ffi_type* FFITypeFromV8 (uint8_t v8Type) {
  if (v8Type == spin::FastTypes::boolean) 
    return &ffi_type_uint8;
  if (v8Type == spin::FastTypes::i8) 
    return &ffi_type_sint8;
  if (v8Type == spin::FastTypes::i16) 
    return &ffi_type_sint16;
  if (v8Type == spin::FastTypes::i32) 
    return &ffi_type_sint32;
  if (v8Type == spin::FastTypes::u8) 
    return &ffi_type_uint8;
  if (v8Type == spin::FastTypes::u16) 
    return &ffi_type_uint16;
  if (v8Type == spin::FastTypes::u32) 
    return &ffi_type_uint32;
  if (v8Type == spin::FastTypes::f32) 
    return &ffi_type_float;
  if (v8Type == spin::FastTypes::f64) 
    return &ffi_type_double;
  if (v8Type == spin::FastTypes::i64) 
    return &ffi_type_sint64;
  if (v8Type == spin::FastTypes::u64) 
    return &ffi_type_uint64;
  if (v8Type == spin::FastTypes::iSize) 
    return &ffi_type_sint64;
  if (v8Type == spin::FastTypes::uSize) 
    return &ffi_type_uint64;
  if (v8Type == spin::FastTypes::pointer) 
    return &ffi_type_pointer;
  if (v8Type == spin::FastTypes::function) 
    return &ffi_type_pointer;
  if (v8Type == spin::FastTypes::string) 
    return &ffi_type_pointer;
  if (v8Type == spin::FastTypes::buffer)
    return &ffi_type_pointer;
  if (v8Type == spin::FastTypes::u32array)
    return &ffi_type_pointer;
  return &ffi_type_void;  
}

// 10 ns if this fn does nothing
// 46 ns for int fn (int)
// 4ns for looping through and allocating args
// 4ns return
// 30 ns for the ffi call

void SlowCallback(const FunctionCallbackInfo<Value> &args) {
  Isolate* isolate = args.GetIsolate();
  foreignFunction* ffn = (foreignFunction*)args.Data()
    .As<Object>()->GetAlignedPointerFromInternalField(1);
  ffi_cif* cif = ffn->cif;
  ffi_arg result;
  uint8_t* start = (uint8_t*)ffn->start;
  for (int i = 0; i < ffn->nargs; i++) {
    if (ffn->params[i] == spin::FastTypes::i32) {
      *(int32_t*)start = (int32_t)Local<Integer>::Cast(args[i])->Value();
      start += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32) {
      *(uint32_t*)start = (uint32_t)Local<Integer>::Cast(args[i])->Value();
      start += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u16) {
      *(uint16_t*)start = (uint16_t)Local<Integer>::Cast(args[i])->Value();
      start += 2;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u8) {
      *(uint8_t*)start = (uint8_t)Local<Integer>::Cast(args[i])->Value();
      start += 1;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u64) {
      *(uint64_t*)start = (uint64_t)Local<Integer>::Cast(args[i])->Value();
      start += 8;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::pointer) {
      *(uint64_t*)start = (uint64_t)Local<Integer>::Cast(args[i])->Value();
      start += 8;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::buffer) {
      Local<Uint8Array> u8 = args[i].As<Uint8Array>();
      uint8_t* ptr = (uint8_t*)u8->Buffer()->Data() + u8->ByteOffset();
      *(uint64_t*)start = (uint64_t)ptr;
      start += 8;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32array) {
      Local<Uint32Array> u32 = args[i].As<Uint32Array>();
      uint8_t* ptr = (uint8_t*)u32->Buffer()->Data() + u32->ByteOffset();
      *(uint64_t*)start = (uint64_t)ptr;
      start += 8;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::string) {
      String::Utf8Value arg0(isolate, args[i]);
      *(uint64_t*)start = (uint64_t)strdup(*arg0);
      start += 8;
      continue;
    }
  }
  ffi_call(cif, FFI_FN(ffn->ffi), &result, ffn->values);
  if (args.Length() > ffn->nargs) {
    uint64_t* res = (uint64_t*)args[ffn->nargs].As<Uint32Array>()->Buffer()->Data();
    *res = (uint64_t)result;
    return;
  }
  if (ffn->rc == spin::FastTypes::i32) {
    args.GetReturnValue().Set(Integer::New(isolate, (int32_t)result));
    return;
  }
  if (ffn->rc == spin::FastTypes::u32) {
    args.GetReturnValue().Set(Integer::New(isolate, (uint32_t)result));
    return;
  }
}

void bindSlowApiSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  void* fn = reinterpret_cast<void*>(Local<Integer>::Cast(args[0])->Value());
  void* wrapped = reinterpret_cast<void*>(Local<Integer>::Cast(args[1])->Value());
  int rtype = Local<Integer>::Cast(args[2])->Value();
  Local<Array> params = args[3].As<Array>();
  Local<ObjectTemplate> tpl = ObjectTemplate::New(isolate);
  tpl->SetInternalFieldCount(2);
  Local<Object> data = tpl->NewInstance(context).ToLocalChecked();
  ffi_cif* cif = (ffi_cif*)calloc(1, sizeof(ffi_cif));
  foreignFunction* ffn = new foreignFunction();
  ffn->fast = wrapped;
  ffn->ffi = fn;
  ffn->cif = cif;
  data->SetAlignedPointerInInternalField(1, ffn);
  int len = params->Length();
  ffi_type* ffirc = FFITypeFromV8(rtype);
  ffn->rc = (FastTypes)rtype;
  ffi_type** ffiargs = (ffi_type**)calloc(len, sizeof(ffi_type*));
  ffn->params = (FastTypes*)calloc(len, sizeof(FastTypes));
  ffn->nargs = len;
  ffn->values = (void**)calloc(ffn->nargs, sizeof(void*));
  int fastlen = len + 1 + needsunwrap((FastTypes)rtype);
  CTypeInfo* cargs = (CTypeInfo*)calloc(fastlen, sizeof(CTypeInfo));
  cargs[0] = CTypeInfo(CTypeInfo::Type::kV8Value);
  int size = 0;
  for (int i = 0; i < len; i++) {
    uint8_t ptype = Local<Integer>::Cast(
      params->Get(context, i).ToLocalChecked())->Value();
    cargs[i + 1] = *CTypeFromV8(ptype);
    ffiargs[i] = FFITypeFromV8(ptype);
    ffn->params[i] = (FastTypes)ptype;
    if (ffn->params[i] == spin::FastTypes::u8) {
      size += 1;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u16) {
      size += 2;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::i32) {
      size += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32) {
      size += 4;
      continue;
    }
    size += 8;
  }
  ffn->start = calloc(1, size);
  uint8_t* start = (uint8_t*)ffn->start;
  for (int i = 0; i < ffn->nargs; i++) {
    if (ffn->params[i] == spin::FastTypes::u8) {
      ffn->values[i] = start;
      start += 1;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u16) {
      ffn->values[i] = start;
      start += 2;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::i32) {
      ffn->values[i] = start;
      start += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32) {
      ffn->values[i] = start;
      start += 4;
      continue;
    }
    ffn->values[i] = start;
    start += 8;
  }
  if (fastlen - 1 > len) {
    cargs[fastlen - 1] = *CTypeFromV8(FastTypes::u32array);
  }
  ffi_status status = ffi_prep_cif(cif, FFI_DEFAULT_ABI, len, ffirc, ffiargs);
  if (status != FFI_OK) {
    // TODO: fix this api
    return;
  }
  Local<FunctionTemplate> funcTemplate = FunctionTemplate::New(
    isolate,
    SlowCallback,
    data,
    Local<Signature>(),
    0,
    ConstructorBehavior::kThrow,
    SideEffectType::kHasNoSideEffect,
    NULL
  );
  Local<Function> fun = 
    funcTemplate->GetFunction(context).ToLocalChecked();
  args.GetReturnValue().Set(fun);
}

void bindFastApiSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  void* fn = reinterpret_cast<void*>(Local<Integer>::Cast(args[0])->Value());
  void* wrapped = reinterpret_cast<void*>(Local<Integer>::Cast(args[1])->Value());
  int rtype = Local<Integer>::Cast(args[2])->Value();
  Local<Array> params = args[3].As<Array>();

  Local<ObjectTemplate> tpl = ObjectTemplate::New(isolate);
  tpl->SetInternalFieldCount(2);
  Local<Object> data = tpl->NewInstance(context).ToLocalChecked();
  ffi_cif* cif = (ffi_cif*)calloc(1, sizeof(ffi_cif));
  foreignFunction* ffn = new foreignFunction();
  ffn->fast = wrapped;
  ffn->ffi = fn;
  ffn->cif = cif;
  data->SetAlignedPointerInInternalField(1, ffn);
  int len = params->Length();
  ffi_type* ffirc = FFITypeFromV8(rtype);
  CTypeInfo* rc;
  if (needsunwrap((FastTypes)rtype)) {
    rc = CTypeFromV8(FastTypes::empty);
  } else {
    rc = CTypeFromV8((FastTypes)rtype);
  }
  ffn->rc = (FastTypes)rtype;
  ffi_type** ffiargs = (ffi_type**)calloc(len, sizeof(ffi_type*));
  ffn->params = (FastTypes*)calloc(len, sizeof(FastTypes));
  ffn->nargs = len;
  ffn->values = (void**)calloc(ffn->nargs, sizeof(void*));
  int fastlen = len + 1 + needsunwrap((FastTypes)rtype);
  CTypeInfo* cargs = (CTypeInfo*)calloc(fastlen, sizeof(CTypeInfo));
  cargs[0] = CTypeInfo(CTypeInfo::Type::kV8Value);
  int size = 0;
  for (int i = 0; i < len; i++) {
    uint8_t ptype = Local<Integer>::Cast(
      params->Get(context, i).ToLocalChecked())->Value();
    cargs[i + 1] = *CTypeFromV8(ptype);
    ffiargs[i] = FFITypeFromV8(ptype);
    ffn->params[i] = (FastTypes)ptype;
    if (ffn->params[i] == spin::FastTypes::u8) {
      size += 1;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u16) {
      size += 2;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::i32) {
      size += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32) {
      size += 4;
      continue;
    }
    size += 8;
  }
  ffn->start = calloc(1, size);
  uint8_t* start = (uint8_t*)ffn->start;
  for (int i = 0; i < ffn->nargs; i++) {
    if (ffn->params[i] == spin::FastTypes::u8) {
      ffn->values[i] = start;
      start += 1;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u16) {
      ffn->values[i] = start;
      start += 2;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::i32) {
      ffn->values[i] = start;
      start += 4;
      continue;
    }
    if (ffn->params[i] == spin::FastTypes::u32) {
      ffn->values[i] = start;
      start += 4;
      continue;
    }
    ffn->values[i] = start;
    start += 8;
  }
  if (fastlen - 1 > len) {
    cargs[fastlen - 1] = *CTypeFromV8(FastTypes::u32array);
  }
  ffi_status status = ffi_prep_cif(cif, FFI_DEFAULT_ABI, len, ffirc, ffiargs);
  if (status != FFI_OK) {
    // TODO: fix this api
    return;
  }
  CFunctionInfo* info = new CFunctionInfo(*rc, fastlen, cargs);
  CFunction* fastCFunc = new CFunction(wrapped, info);
  ffn->cfunc = fastCFunc;
  Local<FunctionTemplate> funcTemplate = FunctionTemplate::New(
    isolate,
    nullptr,
    //SlowCallback,
    data,
    Local<Signature>(),
    0,
    ConstructorBehavior::kThrow,
    SideEffectType::kHasNoSideEffect,
    fastCFunc
  );
  // TODO: figure out how to handle side-effect flag:
  // https://github.com/nodejs/node/pull/46619
  Local<Function> fun = 
    funcTemplate->GetFunction(context).ToLocalChecked();
  args.GetReturnValue().Set(fun);
}



void ffi_prep_cifSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  ffi_cif* v0 = reinterpret_cast<ffi_cif*>(ptr0);
  uint32_t v1 = Local<Integer>::Cast(args[1])->Value();
  uint32_t v2 = Local<Integer>::Cast(args[2])->Value();
  Local<Uint8Array> u83 = args[3].As<Uint8Array>();
  uint8_t* ptr3 = (uint8_t*)u83->Buffer()->Data() + u83->ByteOffset();
  ffi_type* v3 = reinterpret_cast<ffi_type*>(ptr3);
  Local<Uint8Array> u84 = args[4].As<Uint8Array>();
  uint8_t* ptr4 = (uint8_t*)u84->Buffer()->Data() + u84->ByteOffset();
  ffi_type** v4 = reinterpret_cast<ffi_type**>(ptr4);
  int32_t rc = ffi_prep_cif(v0, (ffi_abi)v1, v2, v3, v4);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

int32_t ffi_prep_cifFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1, uint32_t p2, struct FastApiTypedArray* const p3, struct FastApiTypedArray* const p4) {
  ffi_cif* v0 = reinterpret_cast<ffi_cif*>(p0->data);
  uint32_t v1 = p1;
  uint32_t v2 = p2;
  ffi_type* v3 = reinterpret_cast<ffi_type*>(p3->data);
  ffi_type** v4 = reinterpret_cast<ffi_type**>(p4->data);
  return ffi_prep_cif(v0, (ffi_abi)v1, v2, v3, v4);
}
void ffi_callSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  ffi_cif* v0 = reinterpret_cast<ffi_cif*>(ptr0);
  callback v1 = reinterpret_cast<callback>((uint64_t)Local<Integer>::Cast(args[1])->Value());
  Local<Uint32Array> u322 = args[2].As<Uint32Array>();
  uint8_t* ptr2 = (uint8_t*)u322->Buffer()->Data() + u322->ByteOffset();
  void* v2 = reinterpret_cast<void*>(ptr2);
  Local<Uint8Array> u83 = args[3].As<Uint8Array>();
  uint8_t* ptr3 = (uint8_t*)u83->Buffer()->Data() + u83->ByteOffset();
  void** v3 = reinterpret_cast<void**>(ptr3);
  ffi_call(v0, v1, v2, v3);
}

void ffi_callFast(void* p, struct FastApiTypedArray* const p0, void* p1, struct FastApiTypedArray* const p2, struct FastApiTypedArray* const p3) {
  ffi_cif* v0 = reinterpret_cast<ffi_cif*>(p0->data);
  callback v1 = reinterpret_cast<callback>(p1);
  void* v2 = reinterpret_cast<void*>(p2->data);
  void** v3 = reinterpret_cast<void**>(p3->data);
  ffi_call(v0, v1, v2, v3);
}

void Init(Isolate* isolate, Local<ObjectTemplate> target) {
  Local<ObjectTemplate> module = ObjectTemplate::New(isolate);

  v8::CTypeInfo* cargsffi_prep_cif = (v8::CTypeInfo*)calloc(6, sizeof(v8::CTypeInfo));
  cargsffi_prep_cif[0] = v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value);
  cargsffi_prep_cif[1] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  cargsffi_prep_cif[2] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
  cargsffi_prep_cif[3] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint32);
  cargsffi_prep_cif[4] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  cargsffi_prep_cif[5] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  v8::CTypeInfo* rcffi_prep_cif = new v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
  v8::CFunctionInfo* infoffi_prep_cif = new v8::CFunctionInfo(*rcffi_prep_cif, 6, cargsffi_prep_cif);
  v8::CFunction* pFffi_prep_cif = new v8::CFunction((const void*)&ffi_prep_cifFast, infoffi_prep_cif);
  SET_FAST_METHOD(isolate, module, "ffi_prep_cif", pFffi_prep_cif, ffi_prep_cifSlow);

  v8::CTypeInfo* cargsffi_call = (v8::CTypeInfo*)calloc(5, sizeof(v8::CTypeInfo));
  cargsffi_call[0] = v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value);
  cargsffi_call[1] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  cargsffi_call[2] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint64);
  cargsffi_call[3] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint32, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  cargsffi_call[4] = v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone);
  v8::CTypeInfo* rcffi_call = new v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
  v8::CFunctionInfo* infoffi_call = new v8::CFunctionInfo(*rcffi_call, 5, cargsffi_call);
  v8::CFunction* pFffi_call = new v8::CFunction((const void*)&ffi_callFast, infoffi_call);
  SET_FAST_METHOD(isolate, module, "ffi_call", pFffi_call, ffi_callSlow);
  SET_METHOD(isolate, module, "bindFastApi", bindFastApiSlow);
  SET_METHOD(isolate, module, "bindSlowApi", bindSlowApiSlow);

  SET_MODULE(isolate, target, "ffi", module);
}
} // namespace ffi
} // namespace spin

extern "C" {
  void* _register_ffi() {
    return (void*)spin::ffi::Init;
  }
}
