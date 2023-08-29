
// [do not edit,<auto-generated />]
// This file has been automatically generated, please do not change unless you disable auto-generation in the Makefile  
#include <dlfcn.h>
#include <spin.h>

namespace spin {
namespace load {

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



void dlopenFast(void* p, struct FastOneByteString* const p0, int32_t p1, struct FastApiTypedArray* const p_ret);
v8::CTypeInfo cargsdlopen[4] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kSeqOneByteString),
  v8::CTypeInfo(v8::CTypeInfo::Type::kInt32),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32, v8::CTypeInfo::SequenceType::kIsTypedArray, v8::CTypeInfo::Flags::kNone)
};
v8::CTypeInfo rcdlopen = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infodlopen = v8::CFunctionInfo(rcdlopen, 4, cargsdlopen);
v8::CFunction pFdlopen = v8::CFunction((const void*)&dlopenFast, &infodlopen);

void dlsymFast(void* p, void* p0, struct FastOneByteString* const p1, struct FastApiTypedArray* const p_ret);
v8::CTypeInfo cargsdlsym[4] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint64),
  v8::CTypeInfo(v8::CTypeInfo::Type::kSeqOneByteString),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint32, v8::CTypeInfo::SequenceType::kIsTypedArray, v8::CTypeInfo::Flags::kNone)
};
v8::CTypeInfo rcdlsym = v8::CTypeInfo(v8::CTypeInfo::Type::kVoid);
v8::CFunctionInfo infodlsym = v8::CFunctionInfo(rcdlsym, 4, cargsdlsym);
v8::CFunction pFdlsym = v8::CFunction((const void*)&dlsymFast, &infodlsym);

int32_t dlcloseFast(void* p, void* p0);
v8::CTypeInfo cargsdlclose[2] = {
  v8::CTypeInfo(v8::CTypeInfo::Type::kV8Value),
  v8::CTypeInfo(v8::CTypeInfo::Type::kUint64),
};
v8::CTypeInfo rcdlclose = v8::CTypeInfo(v8::CTypeInfo::Type::kInt32);
v8::CFunctionInfo infodlclose = v8::CFunctionInfo(rcdlclose, 2, cargsdlclose);
v8::CFunction pFdlclose = v8::CFunction((const void*)&dlcloseFast, &infodlclose);



void dlopenSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  String::Utf8Value v0(isolate, args[0]);
  int32_t v1 = Local<Integer>::Cast(args[1])->Value();
  void* rc = dlopen(*v0, v1);
  Local<ArrayBuffer> ab = args[2].As<Uint32Array>()->Buffer();
  ((void**)ab->Data())[0] = rc;
}

void dlopenFast(void* p, struct FastOneByteString* const p0, int32_t p1, struct FastApiTypedArray* const p_ret) {
  struct FastOneByteString* const v0 = p0;
  int32_t v1 = p1;
  void* r = dlopen(v0->data, v1);
  ((void**)p_ret->data)[0] = r;

}
void dlsymSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  void* v0 = reinterpret_cast<void*>((uint64_t)Local<Integer>::Cast(args[0])->Value());
  String::Utf8Value v1(isolate, args[1]);
  void* rc = dlsym(v0, *v1);
  Local<ArrayBuffer> ab = args[2].As<Uint32Array>()->Buffer();
  ((void**)ab->Data())[0] = rc;
}

void dlsymFast(void* p, void* p0, struct FastOneByteString* const p1, struct FastApiTypedArray* const p_ret) {
  void* v0 = reinterpret_cast<void*>(p0);
  struct FastOneByteString* const v1 = p1;
  void* r = dlsym(v0, v1->data);
  ((void**)p_ret->data)[0] = r;

}
void dlcloseSlow(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();
  void* v0 = reinterpret_cast<void*>((uint64_t)Local<Integer>::Cast(args[0])->Value());
  int32_t rc = dlclose(v0);
  args.GetReturnValue().Set(Number::New(isolate, rc));
}

int32_t dlcloseFast(void* p, void* p0) {
  void* v0 = reinterpret_cast<void*>(p0);
  return dlclose(v0);
}

void Init(Isolate* isolate, Local<ObjectTemplate> target) {
  Local<ObjectTemplate> module = ObjectTemplate::New(isolate);
  SET_FAST_METHOD(isolate, module, "dlopen", &pFdlopen, dlopenSlow);
  SET_FAST_METHOD(isolate, module, "dlsym", &pFdlsym, dlsymSlow);
  SET_FAST_METHOD(isolate, module, "dlclose", &pFdlclose, dlcloseSlow);

  SET_MODULE(isolate, target, "load", module);
}
} // namespace load
} // namespace spin

extern "C" {
  void* _register_load() {
    return (void*)spin::load::Init;
  }
}
