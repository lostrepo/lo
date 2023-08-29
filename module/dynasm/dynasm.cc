
// [do not edit,<auto-generated />]
// This file has been automatically generated, please do not change unless you disable auto-generation in the Makefile  
#include <dasm_proto.h>
#include <dasm_x86.h>
#include <spin.h>

namespace spin {
namespace dynasm {

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



void initFast(void* p, struct FastApiTypedArray* const p0, int32_t p1);
v8::CTypeInfo cargsinit[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kInt32),
};
v8::CTypeInfo rcinit = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infoinit = v8::CFunctionInfo(rcinit, 3, cargsinit);
v8::CFunction pFinit = v8::CFunction((const void*)&initFast, &infoinit);

void freeFast(void* p, struct FastApiTypedArray* const p0);
v8::CTypeInfo cargsfree[2] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
};
v8::CTypeInfo rcfree = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infofree = v8::CFunctionInfo(rcfree, 2, cargsfree);
v8::CFunction pFfree = v8::CFunction((const void*)&freeFast, &infofree);

void setupglobalFast(void* p, struct FastApiTypedArray* const p0, struct FastApiTypedArray* const p1, uint32_t p2);
v8::CTypeInfo cargssetupglobal[4] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
};
v8::CTypeInfo rcsetupglobal = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infosetupglobal = v8::CFunctionInfo(rcsetupglobal, 4, cargssetupglobal);
v8::CFunction pFsetupglobal = v8::CFunction((const void*)&setupglobalFast, &infosetupglobal);

void growpcFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1);
v8::CTypeInfo cargsgrowpc[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
};
v8::CTypeInfo rcgrowpc = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infogrowpc = v8::CFunctionInfo(rcgrowpc, 3, cargsgrowpc);
v8::CFunction pFgrowpc = v8::CFunction((const void*)&growpcFast, &infogrowpc);

void setupFast(void* p, struct FastApiTypedArray* const p0, void* p1);
v8::CTypeInfo cargssetup[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint64),
};
v8::CTypeInfo rcsetup = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infosetup = v8::CFunctionInfo(rcsetup, 3, cargssetup);
v8::CFunction pFsetup = v8::CFunction((const void*)&setupFast, &infosetup);

void putFast(void* p, struct FastApiTypedArray* const p0, int32_t p1, int32_t p2);
v8::CTypeInfo cargsput[4] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kInt32),
  v8::CTypeInfo(v8::CTypeInfo::Type::kInt32),
};
v8::CTypeInfo rcput = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infoput = v8::CFunctionInfo(rcput, 4, cargsput);
v8::CFunction pFput = v8::CFunction((const void*)&putFast, &infoput);

int32_t linkFast(void* p, struct FastApiTypedArray* const p0, struct FastApiTypedArray* const p1);
v8::CTypeInfo cargslink[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
};
v8::CTypeInfo rclink = v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
v8::CFunctionInfo infolink = v8::CFunctionInfo(rclink, 3, cargslink);
v8::CFunction pFlink = v8::CFunction((const void*)&linkFast, &infolink);

int32_t encodeFast(void* p, struct FastApiTypedArray* const p0, void* p1);
v8::CTypeInfo cargsencode[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint64),
};
v8::CTypeInfo rcencode = v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
v8::CFunctionInfo infoencode = v8::CFunctionInfo(rcencode, 3, cargsencode);
v8::CFunction pFencode = v8::CFunction((const void*)&encodeFast, &infoencode);

int32_t getpclabelFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1);
v8::CTypeInfo cargsgetpclabel[3] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint8, CTypeInfo::SequenceType::kIsTypedArray, CTypeInfo::Flags::kNone),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32),
};
v8::CTypeInfo rcgetpclabel = v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
v8::CFunctionInfo infogetpclabel = v8::CFunctionInfo(rcgetpclabel, 3, cargsgetpclabel);
v8::CFunction pFgetpclabel = v8::CFunction((const void*)&getpclabelFast, &infogetpclabel);



void initSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  int32_t v1 = Local<Integer>::Cast(args[1])->Value();
  dasm_init(v0, v1);
}

void initFast(void* p, struct FastApiTypedArray* const p0, int32_t p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  int32_t v1 = p1;
  dasm_init(v0, v1);
}
void freeSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  dasm_free(v0);
}

void freeFast(void* p, struct FastApiTypedArray* const p0) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  dasm_free(v0);
}
void setupglobalSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  Local<Uint8Array> u81 = args[1].As<Uint8Array>();
  uint8_t* ptr1 = (uint8_t*)u81->Buffer()->Data() + u81->ByteOffset();
  void** v1 = reinterpret_cast<void**>(ptr1);
  uint32_t v2 = Local<Integer>::Cast(args[2])->Value();
  dasm_setupglobal(v0, v1, v2);
}

void setupglobalFast(void* p, struct FastApiTypedArray* const p0, struct FastApiTypedArray* const p1, uint32_t p2) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  void** v1 = reinterpret_cast<void**>(p1->data);
  uint32_t v2 = p2;
  dasm_setupglobal(v0, v1, v2);
}
void growpcSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  uint32_t v1 = Local<Integer>::Cast(args[1])->Value();
  dasm_growpc(v0, v1);
}

void growpcFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  uint32_t v1 = p1;
  dasm_growpc(v0, v1);
}
void setupSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  const void* v1 = reinterpret_cast<const void*>((uint64_t)Local<Integer>::Cast(args[1])->Value());
  dasm_setup(v0, v1);
}

void setupFast(void* p, struct FastApiTypedArray* const p0, void* p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  const void* v1 = reinterpret_cast<const void*>(p1);
  dasm_setup(v0, v1);
}
void putSlow(const FunctionCallbackInfo<Value> &args) {
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  int32_t v1 = Local<Integer>::Cast(args[1])->Value();
  int32_t v2 = Local<Integer>::Cast(args[2])->Value();
  dasm_put(v0, v1, v2);
}

void putFast(void* p, struct FastApiTypedArray* const p0, int32_t p1, int32_t p2) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  int32_t v1 = p1;
  int32_t v2 = p2;
  dasm_put(v0, v1, v2);
}
void linkSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  Local<Uint32Array> u321 = args[1].As<Uint32Array>();
  uint8_t* ptr1 = (uint8_t*)u321->Buffer()->Data() + u321->ByteOffset();
  size_t* v1 = reinterpret_cast<size_t*>(ptr1);
  int32_t rc = dasm_link(v0, v1);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

int32_t linkFast(void* p, struct FastApiTypedArray* const p0, struct FastApiTypedArray* const p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  size_t* v1 = reinterpret_cast<size_t*>(p1->data);
  return dasm_link(v0, v1);
}
void encodeSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  void* v1 = reinterpret_cast<void*>((uint64_t)Local<Integer>::Cast(args[1])->Value());
  int32_t rc = dasm_encode(v0, v1);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

int32_t encodeFast(void* p, struct FastApiTypedArray* const p0, void* p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  void* v1 = reinterpret_cast<void*>(p1);
  return dasm_encode(v0, v1);
}
void getpclabelSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  Local<Uint8Array> u80 = args[0].As<Uint8Array>();
  uint8_t* ptr0 = (uint8_t*)u80->Buffer()->Data() + u80->ByteOffset();
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(ptr0);
  uint32_t v1 = Local<Integer>::Cast(args[1])->Value();
  int32_t rc = dasm_getpclabel(v0, v1);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

int32_t getpclabelFast(void* p, struct FastApiTypedArray* const p0, uint32_t p1) {
  dasm_State ** v0 = reinterpret_cast<dasm_State **>(p0->data);
  uint32_t v1 = p1;
  return dasm_getpclabel(v0, v1);
}

void Init(Isolate* isolate, Local<ObjectTemplate> target) {
  Local<ObjectTemplate> module = ObjectTemplate::New(isolate);
  SET_FAST_METHOD(isolate, module, "init", &pFinit, initSlow);
  SET_FAST_METHOD(isolate, module, "free", &pFfree, freeSlow);
  SET_FAST_METHOD(isolate, module, "setupglobal", &pFsetupglobal, setupglobalSlow);
  SET_FAST_METHOD(isolate, module, "growpc", &pFgrowpc, growpcSlow);
  SET_FAST_METHOD(isolate, module, "setup", &pFsetup, setupSlow);
  SET_FAST_METHOD(isolate, module, "put", &pFput, putSlow);
  SET_FAST_METHOD(isolate, module, "link", &pFlink, linkSlow);
  SET_FAST_METHOD(isolate, module, "encode", &pFencode, encodeSlow);
  SET_FAST_METHOD(isolate, module, "getpclabel", &pFgetpclabel, getpclabelSlow);

  SET_MODULE(isolate, target, "dynasm", module);
}
} // namespace dynasm
} // namespace spin

extern "C" {
  void* _register_dynasm() {
    return (void*)spin::dynasm::Init;
  }
}
