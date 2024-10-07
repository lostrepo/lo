
// ####### lo_base_types start #######
// please add final edits to lo_base_types in lib/types.js
/// <reference no-default-lib="true"/>
/// <reference lib="es2023"/>
// TODO: refine generic NativeLib* types for lib/<module>/api.js (platform)

// generic typedef helper for classes:
// interface IClassX { ... }
// declare var ClassX: Constructor<IClassX>
// TODO: find solution to class declaration issues (TS class declaration !== JS class declaration)
interface Constructor<T> {
  readonly prototype: T;
  new (): T;
}

type OnUnhandledRejection = (error: Error) => void;

type Require = <T extends Record<string | number | symbol, unknown>>(
  file_path: string
) => T | undefined;

interface Console {
  log: (str: unknown) => number;
  error: (str: unknown) => number;
}

// available globally with v8 --expose-gc flag
type GC = undefined | (() => void);

type ZeroOrMinusOne = 0 | -1;
type ENGINE = 'v8';
type OS = 'mac' | 'win' | 'linux';
type ARCH = 'x64' | 'arm64';
type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigUint64Array
  | BigInt64Array
  | ArrayBuffer;

type Ptr<T extends TypedArray> = T & {
  ptr: number;
  size: number;
};

type UnknownLib<T extends string | number> = Record<
  T | string | number | symbol,
  unknown
>;
type Library<T extends string | number> =
  (T extends NativeLibsKeys ? NativeLibXExport<T> : UnknownLib<T>)
    & {
      handle?: number;
      fileName?: string;
      internal?: boolean;
    };

interface RuntimeVersion {
  lo: string;
  v8: string;
}

interface RuntimeGenerics<E extends ENGINE, O extends OS, A extends ARCH> {
  engine: E;
  os: O;
  arch: A;
}

// ####### lo_base_types end #######

// ####### declared_global_types start #######
// please add final edits to declared_global_types in lib/types.js
declare var global: GlobalThis;
declare var onUnhandledRejection: OnUnhandledRejection;
declare var require: Require;
declare var TextEncoder: TextEncoderConstructor;
declare var TextDecoder: TextDecoderConstructor;
declare var lo: Runtime;
declare var gc: GC;
declare var Iterator: IteratorConstructor;
declare var console: Console;
// ####### declared_global_types end #######

// ####### global_this_type start #######
// please add final edits to global_this_type in lib/types.js
interface GlobalThis extends GlobalThisBase {
  global:GlobalThis;
  onUnhandledRejection:OnUnhandledRejection;
  require:Require;
  TextEncoder:TextEncoderConstructor;
  TextDecoder:TextDecoderConstructor;
  lo:Runtime;
  gc:GC;
  Iterator:IteratorConstructor;
  console:Console;
}

// ####### global_this_type end #######

// ####### global_this_base_omit_type start #######
// please add final edits to global_this_base_omit_type in lib/types.js
// we define those manually:
type GlobalThisBaseOmit =   | 'global'
  | 'onUnhandledRejection'
  | 'require'
  | 'TextEncoder'
  | 'TextDecoder'
  | 'lo'
  | 'gc'
  | 'Iterator'
  | 'console';

// ####### global_this_base_omit_type end #######

// ####### native_lib_core_type start #######
// please add final edits to native_lib_core_type in lib/types.js
// lo.core = lo.load('core') + overrides listed here
type Core<T extends 'core' = 'core'> = Overwrite<NativeLibXExport<T>[T], {
  dlsym(handle: number, name: string): number;
  dlopen(path: string, flags: number): number;
  // strnlen(str: string | number, size: number): number;
  /**
   * Reads a file from the given path into a Uint8Array and returns it.
   * @param [path] The path to the file.
   */
  read_file(path: string): Uint8Array;
  /**
   * Creates/Overwrites a file at the specified path with the given Uint8Array
   * as the contents of the file.
   * @param {string}[path] The path of the file to create.
   * @param {TypedArray}[buffer] The data write to the file.
   * @returns {number} Number of bytes written
   */
  write_file(
    path: string,
    buffer: Uint8Array,
    flags?: number,
    mode?: number
  ): number;
  os: OS;
  arch: ARCH;
  engine: ENGINE;
  little_endian: boolean;
  homedir: string;
  defaultWriteFlags: number;
  defaultWriteMode: number;
  mmap(
    ptr: number,
    length: number,
    prot: number,
    flags: number,
    fd: number,
    offset: number,
    buf: Uint32Array
  ): void;
  getcwd(ptr: number, num: number, buf: Uint32Array): void;
  getenv(name: string, buf: Uint32Array): void;
  write_string(num: number, str: string): number;
  readFile(path: string, flags?: number, size?: number): Uint8Array;
  writeFile(
    path: string,
    u8: Uint8Array,
    flags?: number,
    mode?: number
  ): number;

  isFile(path: string): boolean;
  // conditionally defined props
  loader?: (specifier: string, resource: string) => string;
  sync_loader?: (specifier: string, resource: string) => string;
  binding_loader?: <T extends string>(name: T) => Library<T>;
}>;
// ####### native_lib_core_type end #######

// ####### runtime_type start #######
// please add final edits to runtime_type in lib/types.js
// TODO: autogenerate
interface Runtime {
  // validate with list from: lo eval 'console.log(`"${Object.getOwnPropertyNames(lo).join(`":unknown;"`)}":unknown;`)'
  moduleCache: Map<string, ReturnType<Runtime['loadModule']>>;
  libCache: Map<string, object>;
  requireCache: Map<string, object>;
  start: number;
  errno: number;
  colors: Record<Uppercase<string>, string>;
  core: Core;
  libraries(): string[];
  builtins(): string[];
  assert(expression: any, message?: string | Function): any;
  cstr(str: string): Ptr<Uint8Array>;
  load<T extends NativeLibsKeys>(name: T): NativeLibXExport<T>;
  library<T extends string | number>(name: T): Library<T>;
  /**
   * Prints a string to the console
   * @param [str='a string'] The text to print.
   */
  print(str: string): void;
  exit(status: number): void;
  runMicroTasks(): void;
  hrtime(): number;
  nextTick(callback: Function): void;
  getAddress(buf: TypedArray): number;
  utf8Length(str: string): number;
  utf8EncodeInto(str: string, buf: TypedArray): number;
  utf8EncodeIntoAtOffset(str: string, buf: TypedArray, off: number): number;
  utf8_decode(address: number, len?: number): string;
  latin1Decode(address: number, len?: number): string;
  utf8Encode(str: string): Uint8Array;
  utf8Decode: Runtime['utf8_decode'];
  wrap<
    Handle extends Uint32Array,
    WrappedFnArgs extends unknown[],
    WrappedFnRet,
    State,
  >(
    handle: Handle,
    fn: ((...args: [...WrappedFnArgs]) => WrappedFnRet) & { state?: State },
    plen: number
  ): ((...args: WrappedFnArgs) => number) & { state?: State };
  addr(handle: TypedArray): number;
  version: RuntimeVersion;
  args: string[];
  argv: number;
  argc: number;
  workerSource: string;
  builtin(path: string): string;
  os(): OS;
  arch(): ARCH;
  getenv(str: string): string;
  evaluateModule<T extends object>(identifier: number): Promise<T>;
  loadModule(
    source: string,
    specifier: string
  ): {
    requests: string;
    isSourceTextModule: boolean;
    status: number;
    specifier: string;
    src: string;
    identity: number;
    scriptId: number;
    // js land extensions on returned value
    resource?: string;
    evaluated?: boolean;
    namespace?: object; // module namespace object
  };
  readMemory(dest: TypedArray, start: number, len: number): void;
  wrapMemory(start: number, size: number, free?: number): ArrayBuffer;
  unwrapMemory(buffer: ArrayBuffer): void;
  ptr<T extends TypedArray>(u8: T): Ptr<T>;
  register_callback(ptr: number, fn: Function): void;
  registerCallback: Runtime['register_callback'];
  setModuleCallbacks(
    on_module_load: Function,
    on_module_instantiate: Function
  ): void;

  utf8EncodeIntoPtr(str: string, ptr: number): number;
  runScript(source: string, path: string /* resource name */): void;
  pumpMessageLoop(): void;
  readMemoryAtOffset(
    u8: TypedArray,
    start: number,
    size: number,
    offset: number
  ): void;
  setFlags(str: string): void;
  getMeta: unknown;

  setenv: Core['setenv'];
  getcwd(): string;
  run_script: Runtime['runScript'];
  bindings: Runtime['libraries'];
  evaluate_module: Runtime['evaluateModule'];
  get_address: Runtime['getAddress'];
  get_meta: Runtime['getMeta'];
  latin1_decode: Runtime['latin1Decode'];
  lib_cache: Runtime['libCache'];
  load_module: Runtime['loadModule'];
  module_cache: Runtime['moduleCache'];
  next_tick: Runtime['nextTick'];
  pump_message_loop: Runtime['pumpMessageLoop'];
  read_memory: Runtime['readMemory'];
  read_memory_at_offset: Runtime['readMemoryAtOffset'];
  require_cache: Runtime['requireCache'];
  run_microtasks: Runtime['runMicroTasks'];
  set_flags: Runtime['setFlags'];
  set_module_callbacks: Runtime['setModuleCallbacks'];
  unwrap_memory: Runtime['unwrapMemory'];
  utf8_encode: Runtime['utf8Encode'];
  utf8_encode_into: Runtime['utf8EncodeInto'];
  utf8_encode_into_ptr: Runtime['utf8EncodeIntoPtr'];
  utf8_encode_into_at_offset: Runtime['utf8EncodeIntoAtOffset'];
  utf8_length: Runtime['utf8Length'];
  wrap_memory: Runtime['wrapMemory'];
}
// ####### runtime_type end #######

// ####### text_encoder_types start #######
// please add final edits to text_encoder_types in lib/types.js
type TextEncoderConstructor = Constructor<ITextEncoder>;
interface ITextEncoder {
  /**
   * The encoding supported by the `TextEncoder` instance. Always set to `'utf-8'`.
   */
  readonly encoding: string;
  /**
   * UTF-8 encodes the `input` string and returns a `Uint8Array` containing the
   * encoded bytes.
   * @param [input='an empty string'] The text to encode.
   */
  encode(input?: string): Uint8Array;
  /**
   * UTF-8 encodes the `src` string to the `dest` Uint8Array and returns an object
   * containing the read Unicode code units and written UTF-8 bytes.
   *
   * ```js
   * const encoder = new TextEncoder();
   * const src = 'this is some data';
   * const dest = new Uint8Array(10);
   * const { read, written } = encoder.encodeInto(src, dest);
   * ```
   * @param src The text to encode.
   * @param dest The array to hold the encode result.
   */
  encodeInto(src?: string, dest?: Uint8Array): number;
}

// ####### text_encoder_types end #######

// ####### text_decoder_types start #######
// please add final edits to text_decoder_types in lib/types.js
type TextDecoderConstructor = Constructor<ITextDecoder>;
interface ITextDecoder {
  /**
   * The encoding supported by the `TextEncoder` instance. Always set to `'utf-8'`.
   */
  readonly encoding: string;
  /**
   * UTF-8 decodes the `Uint8Array` and returns an `input` string.
   */
  decode(ptr_source?: Ptr<Uint8Array> | Uint8Array): string;
}
// ####### text_decoder_types end #######

// ####### iterator_types start #######
// please add final edits to iterator_types in lib/types.js
// Iterator class type from https://github.com/zloirock/core-js#iterator-helpers
interface IteratorConstructor extends Constructor<IIterator> {
  from(iterable: Iterable<any> | Iterator<any>): Iterator<any>;
}
type Uint = number;
interface IIterator {
  drop(limit: Uint): Iterator<any>;
  every(callbackfn: (value: any, counter: Uint) => boolean): boolean;
  filter(callbackfn: (value: any, counter: Uint) => boolean): Iterator<any>;
  find(callbackfn: (value: any, counter: Uint) => boolean): any;
  flatMap(callbackfn: (value: any, counter: Uint) => Iterable<any> | Iterator<any>): Iterator<any>;
  forEach(callbackfn: (value: any, counter: Uint) => void): void;
  map(callbackfn: (value: any, counter: Uint) => any): Iterator<any>;
  reduce(callbackfn: (memo: any, value: any, counter: Uint) => any, initialValue: any): any;
  some(callbackfn: (value: any, counter: Uint) => boolean): boolean;
  take(limit: Uint): Iterator<any>;
  toArray(): Array<any>;
}
// ####### iterator_types end #######

// ####### native_lib_api_types start #######
// please add final edits to native_lib_api_types in lib/types.js
// ############ NativeLib API stuff ##############
type LIB_API_ARCH = 'x64';
type LIB_API_C_TYPE = 'u64' | 'f64' | 'u32' | 'i64' | 'f32' | 'i32' | 'u8' | 'void' | 'char';
type LIB_API_POINTER = 'pointer'
type LIB_API_BOOL = 'bool';
type LIB_API_STRING = 'string';
type LIB_API_BUFFER = 'buffer';
type LIB_API_TYPED_ARRAY = 'u32array';

type LibApiParameter = LIB_API_POINTER | LIB_API_C_TYPE | LIB_API_STRING
  | LIB_API_BUFFER | LIB_API_TYPED_ARRAY | LIB_API_BOOL;
type LibApiResult = LIB_API_POINTER | LIB_API_C_TYPE | LIB_API_BOOL;
type LibApiPointer = string; // this is sad
type LibApiOverride = { param: number, fastfield: string, slowfield: string } | number;
type LibApiItem = { nofast: boolean; declare_only: boolean; } | {
  parameters: LibApiParameter[];
  optional?: (true | false | 1 | 0 | undefined)[];
  pointers?: (LibApiPointer | void)[];
  result: LibApiResult;
  rpointer?: LibApiPointer | [LibApiPointer];
  name?: string;
  arch?: ARCH[];
  override?: (LibApiOverride | void)[];
  casts?: (string | void)[];
  jsdoc?: string;
  man?: string[] | string;
  nofast?: boolean;
  nonblocking?: boolean;
};
type LibApi = Record<string, LibApiItem>;
type LibApiTypedFn = <const T extends LibApi>(api: T) => T;


type ConstantType = Omit<LIB_API_C_TYPE, 'void' | 'char'> | number;
type LibConstants = Record<string, ConstantType>;
type LibConstsTypedFn = <const T extends LibConstants>(constnats: T) => T;

type Platform = 'mac' | 'linux';
interface LibPlatform {
  name: string;
  api: LibApi;
  constants?: LibConstants;
  structs?: string[];
  includes?: string[];
  libs?: string[];
  externs?: string[];
  include_paths?: string[];
  lib_paths?: string[];
  obj?: string[];
  preamble?: string;
}
type LibPlatformTypedFn = <const T extends Partial<LibPlatform>>(platform: T) => T;

// ####### native_lib_api_types end #######

// ####### native_lib_exports_types start #######
// please add final edits to native_lib_exports_types in lib/types.js
// ############ NativeLib Exports stuff ##############
// helpers
type Overwrite<T, U> = Omit<T, keyof U> & U;

// native lib helpers
type NativeLibsKeys = keyof NativeLibs;
type NativeLibX<T extends NativeLibsKeys> = NativeLibs[T];
type NativeLibXExport<T extends NativeLibsKeys> = Pick<NativeLibs, T>

// ####### native_lib_exports_types end #######



// ####### !!!DO NOT EDIT CODE BELOW THIS LINE! AUTOGENERATED!!! #######
// TODO: add lo.core.engine prop to determine engine
interface CurrentRuntimeGenerics extends RuntimeGenerics<'v8', 'linux', 'x64'> {}
// global base type
// keep only things that we have, no need to confuse people
interface GlobalThisBase
  extends Omit<Pick<
    typeof globalThis,
    // list from: lo eval 'console.log(`"${Object.getOwnPropertyNames(globalThis).join(`"    \n| "`)}"`)'
    | "Object"
    | "Function"
    | "Array"
    | "Number"
    | "parseFloat"
    | "parseInt"
    | "Infinity"
    | "NaN"
    | "undefined"
    | "Boolean"
    | "String"
    | "Symbol"
    | "Date"
    | "Promise"
    | "RegExp"
    | "Error"
    | "AggregateError"
    | "EvalError"
    | "RangeError"
    | "ReferenceError"
    | "SyntaxError"
    | "TypeError"
    | "URIError"
    | "globalThis"
    | "JSON"
    | "Math"
    | "Intl"
    | "ArrayBuffer"
    | "Atomics"
    | "Uint8Array"
    | "Int8Array"
    | "Uint16Array"
    | "Int16Array"
    | "Uint32Array"
    | "Int32Array"
    | "Float32Array"
    | "Float64Array"
    | "Uint8ClampedArray"
    | "BigUint64Array"
    | "BigInt64Array"
    | "DataView"
    | "Map"
    | "BigInt"
    | "Set"
    | "WeakMap"
    | "WeakSet"
    | "Proxy"
    | "Reflect"
    | "FinalizationRegistry"
    | "WeakRef"
    | "decodeURI"
    | "decodeURIComponent"
    | "encodeURI"
    | "encodeURIComponent"
    | "escape"
    | "unescape"
    | "eval"
    | "isFinite"
    | "isNaN"
    | "SharedArrayBuffer"
    // missing typedefs (extract from typescript DOM lib, we don't need DOM messing with types):
    // WebAssembly issue - https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/826
    // WebAssembly
  >,
  GlobalThisBaseOmit
  > {}

interface NativeLibs {
  bestlines: {
    bestline(p0: TypedArray): number;
    bestline_raw(p0: TypedArray,p1: number,p2: number): number;
    cls(p0: number): void;
    add(p0: number): number;
    save(p0: string): number;
    load(p0: string): number;
  };
  heap: {
  };
  mach: {
    task_info(p0: number,p1: number,p2: number,p3: number): number;
    task_self(): number;
    get_executable_path(p0: number,p1: Uint32Array): number;
    TASK_BASIC_INFO_COUNT: number;
    KERN_SUCCESS: number;
    TASK_BASIC_INFO: number;
    task_basic_info: number;
    mach_msg_type_number_t: number;
  };
  system: {
    mmap(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number): number;
    munmap(p0: number,p1: number): number;
    getcwd(p0: TypedArray,p1: number): number;
    mprotect(p0: number,p1: number,p2: number): number;
    memcpy(p0: number,p1: number,p2: number): number;
    memmove(p0: number,p1: number,p2: number): number;
    exit(p0: number): void;
    usleep(p0: number): number;
    getpid(): number;
    getrusage(p0: number,p1: TypedArray): number;
    sleep(p0: number): number;
    fork(): number;
    kill(p0: number,p1: number): number;
    waitpid(p0: number,p1: TypedArray,p2: number): number;
    execvp(p0: string,p1: TypedArray): number;
    readlink(p0: string,p1: TypedArray,p2: number): number;
    sysconf(p0: number): number;
    getrlimit(p0: number,p1: Uint32Array): number;
    setrlimit(p0: number,p1: Uint32Array): number;
    strerror_r(p0: number,p1: TypedArray,p2: number): number;
    times(p0: TypedArray): number;
    getenv(p0: string): number;
    calloc(p0: number,p1: number): number;
    free(p0: number): void;
    sysinfo(p0: TypedArray): number;
    get_avphys_pages(): number;
    signal(p0: number,p1: number): number;
    memfd_create(p0: string,p1: number): number;
    pidfd_open(p0: number,p1: number,p2: number): number;
    gettid(p0: number): number;
    timerfd_create(p0: number,p1: number): number;
    timerfd_settime(p0: number,p1: number,p2: TypedArray,p3: number): number;
    eventfd(p0: number,p1: number): number;
    clock_gettime(p0: number,p1: number): number;
    _SC_CLK_TCK: number;
    _SC_NPROCESSORS_ONLN: number;
    EFD_NONBLOCK: number;
    EFD_CLOEXEC: number;
    EFD_SEMAPHORE: number;
  };
  encode: {
    hex_encode(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    hex_decode(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    base64_encode(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    base64_encode_str(p0: string,p1: number,p2: number,p3: number): number;
    base64_decode(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    base64_decode_str(p0: number,p1: number,p2: string,p3: number): number;
  };
  tcc: {
    tcc_new(): number;
    tcc_delete(p0: number): void;
    tcc_set_output_type(p0: number,p1: number): number;
    tcc_set_options(p0: number,p1: string): void;
    tcc_add_library_path(p0: number,p1: string): number;
    tcc_add_library(p0: number,p1: string): number;
    tcc_add_include_path(p0: number,p1: string): number;
    tcc_add_file(p0: number,p1: string): number;
    tcc_compile_string(p0: number,p1: string): number;
    tcc_relocate(p0: number,p1: number): number;
    tcc_get_symbol(p0: number,p1: string): number;
    tcc_add_symbol(p0: number,p1: string,p2: number): number;
    tcc_output_file(p0: number,p1: string): number;
  };
  fsmount: {
    mount(p0: string,p1: string,p2: string,p3: number,p4: number): number;
    umount(p0: string): number;
    umount2(p0: string,p1: number): number;
    MNT_FORCE: number;
    MNT_DETACH: number;
    MNT_EXPIRE: number;
    UMOUNT_NOFOLLOW: number;
    MS_DIRSYNC: number;
    MS_LAZYTIME: number;
    MS_MANDLOCK: number;
    MS_NOATIME: number;
    MS_NODEV: number;
    MS_NODIRATIME: number;
    MS_NOEXEC: number;
    MS_NOSUID: number;
    MS_RDONLY: number;
    MS_REC: number;
    MS_RELATIME: number;
    MS_SILENT: number;
    MS_STRICTATIME: number;
    MS_SYNCHRONOUS: number;
    MS_NOSYMFOLLOW: number;
  };
  pthread: {
    create(p0: Uint32Array,p1: number,p2: number,p3: TypedArray): number;
    cancel(p0: number): number;
    detach(p0: number): number;
    join(p0: number,p1: number): number;
    exit(p0: Uint32Array): void;
    tryJoin(p0: number,p1: number): number;
    setName(p0: number,p1: string): number;
    setAffinity(p0: number,p1: number,p2: TypedArray): number;
    getAffinity(p0: number,p1: number,p2: TypedArray): number;
    getcpuclockid(p0: number,p1: Uint32Array): number;
    self(): number;
    EBUSY: number;
  };
  sqlite: {
    version(): number;
    open(p0: number,p1: Uint32Array): number;
    open2(p0: string,p1: Uint32Array,p2: number,p3: number): number;
    exec(p0: number,p1: string,p2: number,p3: number,p4: Uint32Array): number;
    exec2(p0: number,p1: string,p2: number,p3: number,p4: Uint32Array): number;
    exec3(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    exec4(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    errmsg(p0: number): number;
    close2(p0: number): number;
    prepare2(p0: number,p1: string,p2: number,p3: Uint32Array,p4: number): number;
    finalize(p0: number): number;
    column_count(p0: number): number;
    column_type(p0: number,p1: number): number;
    column_name(p0: number,p1: number): number;
    step(p0: number): number;
    reset(p0: number): number;
    bind_int(p0: number,p1: number,p2: number): number;
    bind_int64(p0: number,p1: number,p2: number): number;
    bind_double(p0: number,p1: number,p2: number): number;
    bind_text(p0: number,p1: number,p2: string,p3: number,p4: number): number;
    bind_blob(p0: number,p1: number,p2: TypedArray,p3: number,p4: number): number;
    column_int(p0: number,p1: number): number;
    column_double(p0: number,p1: number): number;
    column_text(p0: number,p1: number): number;
    column_blob(p0: number,p1: number): number;
    column_bytes(p0: number,p1: number): number;
    blob_open(p0: number,p1: string,p2: string,p3: string,p4: number,p5: number,p6: Uint32Array): number;
    blob_bytes(p0: number): number;
    blob_read(p0: number,p1: TypedArray,p2: number,p3: number): number;
    blob_close(p0: number): number;
    blob_write(p0: number,p1: TypedArray,p2: number,p3: number): number;
    serialize(p0: number,p1: string,p2: Uint32Array,p3: number): number;
    deserialize(p0: number,p1: string,p2: TypedArray,p3: number,p4: number,p5: number): number;
    SQLITE_OPEN_READWRITE: number;
    SQLITE_OPEN_PRIVATECACHE: number;
    SQLITE_ROW: number;
    SQLITE_OPEN_NOMUTEX: number;
    SQLITE_OPEN_CREATE: number;
    SQLITE_OK: number;
    SQLITE_OPEN_READONLY: number;
  };
  kevents: {
    kqueue(): number;
    kevent(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number): number;
    kevent64(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number): number;
    EVFILT_READ: number;
    EVFILT_EXCEPT: number;
    EVFILT_WRITE: number;
    EVFILT_VNODE: number;
    EVFILT_PROC: number;
    EVFILT_SIGNAL: number;
    EVFILT_MACHPORT: number;
    EVFILT_TIMER: number;
    EV_ADD: number;
    EV_ENABLE: number;
    EV_DISABLE: number;
    EV_DELETE: number;
    EV_RECEIPT: number;
    EV_ONESHOT: number;
    EV_CLEAR: number;
    EV_EOF: number;
    EV_OOBAND: number;
    EV_ERROR: number;
    KEVENT_FLAG_IMMEDIATE: number;
    kevent64_s: number;
    time_t: number;
    timespec: number;
  };
  duckdb: {
    create_config(p0: number): number;
    open_ext(p0: string,p1: Uint32Array,p2: number,p3: number): number;
    set_config(p0: number,p1: string,p2: string): number;
    connect(p0: number,p1: Uint32Array): number;
    query(p0: number,p1: string,p2: number): number;
    prepare(p0: number,p1: string,p2: Uint32Array): number;
    row_count(p0: number): number;
    column_count(p0: number): number;
    value_timestamp(p0: number,p1: number,p2: number): number;
    value_uint32(p0: number,p1: number,p2: number): number;
    value_int32(p0: number,p1: number,p2: number): number;
    value_varchar(p0: number,p1: number,p2: number): number;
    close(p0: number): void;
    destroy_result(p0: number): void;
    destroy_prepare(p0: number): void;
    execute_prepared(p0: number,p1: number): number;
    column_name(p0: number,p1: number): number;
    column_type(p0: number,p1: number): number;
    result_error(p0: number): number;
    value_is_null(p0: number,p1: number,p2: number): number;
    disconnect(p0: number): void;
    library_version(): number;
    DuckDBSuccess: number;
    DuckDBError: number;
    duckdb_config: number;
    duckdb_result: number;
    duckdb_connection: number;
    duckdb_database: number;
    duckdb_prepared_statement: number;
  };
  rustls: {
    version(): number;
    client_config_builder_new(): number;
    connection_set_log_callback(p0: number,p1: number): void;
    connection_set_userdata(p0: number,p1: number): void;
    client_config_builder_dangerous_set_certificate_verifier(p0: number,p1: number): number;
    root_cert_store_builder_new(): number;
    root_cert_store_builder_load_roots_from_file(p0: number,p1: string,p2: boolean | 1 | 0): number;
    root_cert_store_builder_load_roots_from_bytes(p0: number,p1: TypedArray,p2: number,p3: boolean | 1 | 0): number;
    root_cert_store_builder_build(p0: number,p1: number): number;
    web_pki_server_cert_verifier_builder_new(p0: number): number;
    web_pki_server_cert_verifier_builder_build(p0: number,p1: number): number;
    client_config_builder_set_server_verifier(p0: number,p1: number): void;
    client_config_builder_set_enable_sni(p0: number,p1: boolean | 1 | 0): void;
    client_config_builder_set_alpn_protocols(p0: number,p1: number,p2: number): number;
    client_config_builder_build(p0: number): number;
    client_config_free(p0: number): void;
    client_connection_new(p0: number,p1: number,p2: Uint32Array): number;
    connection_wants_read(p0: number): number;
    connection_read_tls(p0: number,p1: number,p2: TypedArray,p3: Uint32Array): number;
    connection_read_tls_from_fd(p0: number,p1: number,p2: Uint32Array): number;
    connection_read(p0: number,p1: TypedArray,p2: number,p3: Uint32Array): number;
    connection_wants_write(p0: number): number;
    connection_write_tls(p0: number,p1: number,p2: TypedArray,p3: Uint32Array): number;
    connection_write_tls_to_fd(p0: number,p1: number,p2: Uint32Array): number;
    connection_write(p0: number,p1: TypedArray,p2: number,p3: Uint32Array): number;
    connection_process_new_packets(p0: number): number;
    connection_free(p0: number): void;
  };
  libffi: {
    ffi_prep_cif(p0: TypedArray,p1: number,p2: number,p3: TypedArray,p4: TypedArray): number;
    ffi_call(p0: TypedArray,p1: number,p2: Uint32Array,p3: TypedArray): void;
  };
  epoll: {
    create(p0: number): number;
    modify(p0: number,p1: number,p2: number,p3: TypedArray): number;
    wait(p0: number,p1: TypedArray,p2: number,p3: number): number;
    close(p0: number): number;
    EPOLLIN: number;
    EPOLLOUT: number;
    EPOLLERR: number;
    EPOLLHUP: number;
    EPOLL_CLOEXEC: number;
    EPOLLEXCLUSIVE: number;
    EPOLLWAKEUP: number;
    EPOLLONESHOT: number;
    EPOLLET: number;
    EPOLL_CTL_ADD: number;
    EPOLL_CTL_DEL: number;
    EPOLL_CTL_MOD: number;
    EVENT_SIZE: number;
    EAGAIN: number;
  };
  cfzlib: {
    deflate(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    inflate(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
  };
  mbedtls: {
    x509_crt_init(p0: number): void;
    net_init(p0: number): void;
    ssl_init(p0: number): void;
    ssl_config_init(p0: number): void;
    entropy_init(p0: number): void;
    ctr_drbg_init(p0: number): void;
    x509_crt_parse_der(p0: number,p1: number,p2: number): number;
    debug_set_threshold(p0: number): void;
    ctr_drbg_seed(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    exit(p0: number): void;
    x509_crt_parse(p0: number,p1: number,p2: number): number;
    ssl_config_defaults(p0: number,p1: number,p2: number,p3: number): number;
    ssl_conf_max_frag_len(p0: number,p1: number): number;
    ssl_conf_rng(p0: number,p1: number,p2: number): void;
    ssl_conf_dbg(p0: number,p1: number,p2: number): void;
    ssl_conf_read_timeout(p0: number,p1: number): void;
    ssl_conf_session_tickets(p0: number,p1: number): void;
    ssl_conf_renegotiation(p0: number,p1: number): void;
    ssl_conf_ca_chain(p0: number,p1: number,p2: number): void;
    ssl_conf_min_version(p0: number,p1: number,p2: number): void;
    ssl_conf_max_version(p0: number,p1: number,p2: number): void;
    ssl_setup(p0: number,p1: number): number;
    ssl_set_hostname(p0: number,p1: string): number;
    ssl_set_bio(p0: number,p1: number,p2: number,p3: number,p4: number): void;
    net_connect(p0: number,p1: string,p2: string,p3: number): number;
    net_set_block(p0: number): number;
    ssl_handshake(p0: number): number;
    ssl_get_version(p0: number): number;
    ssl_get_ciphersuite(p0: number): number;
    ssl_get_verify_result(p0: number): number;
    ssl_write(p0: number,p1: number,p2: number): number;
    ssl_read(p0: number,p1: number,p2: number): number;
    ssl_close_notify(p0: number): number;
    net_free(p0: number): void;
    ssl_free(p0: number): void;
    ssl_config_free(p0: number): void;
    x509_crt_free(p0: number): void;
    ctr_drbg_free(p0: number): void;
    entropy_free(p0: number): void;
    dhm_init(p0: number): void;
    md5_init(p0: number): void;
    md5_free(p0: number): void;
    md5_starts(p0: number): void;
    md5_update(p0: number,p1: number,p2: number): void;
    md5_finish(p0: number,p1: number): void;
    sha256_init(p0: number): void;
    sha256_free(p0: number): void;
    sha256_starts(p0: number,p1: number): void;
    sha256_update(p0: number,p1: number,p2: number): void;
    sha256_finish(p0: number,p1: number): void;
    MBEDTLS_SSL_IS_CLIENT: number;
    MBEDTLS_SSL_TRANSPORT_STREAM: number;
    MBEDTLS_SSL_PRESET_DEFAULT: number;
    MBEDTLS_SSL_MAX_FRAG_LEN_NONE: number;
    MBEDTLS_SSL_SESSION_TICKETS_ENABLED: number;
    MBEDTLS_SSL_TLS1_3_KEY_EXCHANGE_MODE_ALL: number;
    MBEDTLS_SSL_RENEGOTIATION_DISABLED: number;
    MBEDTLS_SSL_MAJOR_VERSION_3: number;
    MBEDTLS_SSL_MINOR_VERSION_4: number;
    MBEDTLS_NET_PROTO_TCP: number;
    MBEDTLS_ERR_SSL_WANT_READ: number;
    MBEDTLS_ERR_SSL_WANT_WRITE: number;
    MBEDTLS_ERR_SSL_CRYPTO_IN_PROGRESS: number;
    MBEDTLS_ERR_SSL_PEER_CLOSE_NOTIFY: number;
    mbedtls_net_context: number;
    mbedtls_x509_crt: number;
    mbedtls_entropy_context: number;
    mbedtls_ssl_context: number;
    mbedtls_ssl_config: number;
    mbedtls_ctr_drbg_context: number;
    mbedtls_dhm_context: number;
    mbedtls_md5_context: number;
    mbedtls_sha256_context: number;
  };
  net: {
    socket(p0: number,p1: number,p2: number): number;
    socketpair(p0: number,p1: number,p2: number,p3: number): number;
    setsockopt(p0: number,p1: number,p2: number,p3: TypedArray,p4: number): number;
    bind(p0: number,p1: TypedArray,p2: number): number;
    connect(p0: number,p1: TypedArray,p2: number): number;
    listen(p0: number,p1: number): number;
    close(p0: number): number;
    accept(p0: number,p1: number,p2: number): number;
    send(p0: number,p1: TypedArray,p2: number,p3: number): number;
    send_string(p0: number,p1: string,p2: number,p3: number): number;
    send2(p0: number,p1: number,p2: number,p3: number): number;
    sendto(p0: number,p1: TypedArray,p2: number,p3: number,p4: TypedArray,p5: number): number;
    recv(p0: number,p1: TypedArray,p2: number,p3: number): number;
    recv2(p0: number,p1: number,p2: number,p3: number): number;
    recvfrom(p0: number,p1: TypedArray,p2: number,p3: number,p4: TypedArray,p5: TypedArray): number;
    sendmsg(p0: number,p1: TypedArray,p2: number): number;
    recvmsg(p0: number,p1: TypedArray,p2: number): number;
    read(p0: number,p1: TypedArray,p2: number): number;
    write_string(p0: number,p1: string,p2: number): number;
    write(p0: number,p1: TypedArray,p2: number): number;
    dup2(p0: number,p1: number): number;
    getsockname(p0: number,p1: TypedArray,p2: Uint32Array): number;
    recvmmsg(p0: number,p1: TypedArray,p2: number,p3: number,p4: TypedArray): number;
    sendmmsg(p0: number,p1: TypedArray,p2: number,p3: number): number;
    pipe2(p0: Uint32Array,p1: number): number;
    accept4(p0: number,p1: number,p2: number,p3: number): number;
    ioctl(p0: number,p1: number,p2: TypedArray): number;
    ioctl2(p0: number,p1: number,p2: number): number;
    ioctl3(p0: number,p1: number,p2: number): number;
    EINPROGRESS: number;
    EAGAIN: number;
    AF_INET: number;
    AF_UNIX: number;
    SOCK_STREAM: number;
    SOL_SOCKET: number;
    SO_REUSEPORT: number;
    SOMAXCONN: number;
    MSG_NOSIGNAL: number;
    SOCK_DGRAM: number;
    SOCK_RAW: number;
    SIOCGIFADDR: number;
    IPPROTO_RAW: number;
    SIOCSIFFLAGS: number;
    SIOCSIFADDR: number;
    SIOCSIFNETMASK: number;
    SOCKADDR_LEN: number;
    TCP_NODELAY: number;
    SO_REUSEADDR: number;
    IPPROTO_TCP: number;
    SO_KEEPALIVE: number;
    INADDR_ANY: number;
    IPPROTO_IP: number;
    IP_ADD_MEMBERSHIP: number;
    SOCK_NONBLOCK: number;
    SOCK_CLOEXEC: number;
    PF_PACKET: number;
    ETH_P_ALL: number;
    ETH_P_ARP: number;
    SIOCGIFHWADDR: number;
    SIOCGIFINDEX: number;
    IFF_TUN: number;
    IFF_TAP: number;
    IFF_NO_PI: number;
    IFF_UP: number;
    TUNSETIFF: number;
    TUNSETPERSIST: number;
    TCP_CORK: number;
    SOCK_SEQPACKET: number;
    ip_mreq: number;
  };
  seccomp: {
    seccomp_syscall_resolve_num_arch(p0: number,p1: number): number;
    seccomp_init(p0: number): number;
    seccomp_rule_add_exact(p0: number,p1: number,p2: number,p3: number): number;
    seccomp_load(p0: number): number;
    seccomp_release(p0: number): void;
    seccomp_syscall_resolve_name(p0: string): number;
  };
  lz4: {
    compress_default(p0: number,p1: number,p2: number,p3: number): number;
    compress_hc(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    decompress_safe(p0: number,p1: number,p2: number,p3: number): number;
  };
  zlib: {
    deflate(p0: TypedArray,p1: number,p2: TypedArray,p3: number,p4: number): number;
    inflate(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
  };
  wireguard: {
    set(p0: number): number;
    get(p0: Uint32Array,p1: string): number;
    add(p0: string): number;
    delete(p0: string): number;
    free(p0: number): void;
    list(): number;
    keytobase64(p0: TypedArray,p1: TypedArray): void;
    keyfrombase64(p0: TypedArray,p1: TypedArray): number;
    genpubKey(p0: TypedArray,p1: TypedArray): void;
    genprivKey(p0: TypedArray): void;
    genpresharedKey(p0: TypedArray): void;
  };
  raylib: {
    InitWindow(p0: number,p1: number,p2: string): void;
    SetTargetFPS(p0: number): void;
    WindowShouldClose(): boolean | 1 | 0;
    IsKeyPressed(p0: number): boolean | 1 | 0;
    IsGestureDetected(p0: number): boolean | 1 | 0;
    BeginDrawing(): void;
    ClearBackground(p0: TypedArray): void;
    DrawText(p0: string,p1: number,p2: number,p3: number,p4: TypedArray): void;
    DrawRectangle(p0: number,p1: number,p2: number,p3: number,p4: TypedArray): void;
    EndDrawing(): void;
    CloseWindow(): void;
  };
  curl: {
    fopen(p0: string,p1: string): number;
    fdopen(p0: number,p1: string): number;
    fclose(p0: number): number;
    fflush(p0: number): number;
    global_init(p0: number): number;
    easy_init(): number;
    version(): number;
    easy_setopt(p0: number,p1: number,p2: string): number;
    easy_setopt_2(p0: number,p1: number,p2: number): number;
    easy_setopt_3(p0: number,p1: number,p2: number): number;
    easy_perform(p0: number): number;
    easy_cleanup(p0: number): void;
    global_cleanup(): void;
    easy_getinfo(p0: number,p1: number,p2: Uint32Array): number;
    CURLINFO_OFF_T: number;
    CURL_GLOBAL_DEFAULT: number;
    CURLOPT_URL: number;
    CURLOPT_BUFFERSIZE: number;
    CURLOPT_HTTP_VERSION: number;
    CURL_HTTP_VERSION_1_1: number;
    CURLOPT_FOLLOWLOCATION: number;
    CURLINFO_SIZE_DOWNLOAD_T: number;
    CURLOPT_WRITEFUNCTION: number;
    CURLOPT_WRITEDATA: number;
    CURLINFO_RESPONSE_CODE: number;
    CURLOPT_FAILONERROR: number;
    CURL_GLOBAL_NOTHING: number;
    CURLOPT_ERRORBUFFER: number;
    CURLOPT_HEADER: number;
    CURLOPT_USERAGENT: number;
  };
  webui: {
    webui_wait(): void;
    webui_new_window(): number;
    webui_show(p0: number,p1: TypedArray): boolean | 1 | 0;
    webui_show_browser(p0: number,p1: string,p2: number): number;
    webui_interface_bind(p0: number,p1: string,p2: number): number;
    webui_script(p0: number,p1: string,p2: number,p3: string,p4: number): number;
    webui_run(p0: number,p1: string): void;
    webui_interface_set_response(p0: number,p1: number,p2: string): void;
    webui_exit(): void;
    webui_is_shown(p0: number): number;
    webui_close(p0: number): void;
    webui_set_file_handler(p0: number,p1: number): void;
    webui_interface_is_app_running(): number;
    webui_set_profile(p0: number,p1: string,p2: string): void;
    webui_interface_get_int_at(p0: number,p1: number,p2: number): number;
    webui_interface_get_string_at(p0: number,p1: number,p2: number): number;
    webui_clean(): void;
    webui_set_root_folder(p0: number,p1: string): number;
    webui_set_tls_certificate(p0: string,p1: string): number;
    webui_set_kiosk(p0: number,p1: number): void;
    webui_destroy(p0: number): void;
    webui_set_timeout(p0: number): void;
    webui_set_icon(p0: number,p1: string,p2: string): void;
    webui_encode(p0: string): number;
    webui_decode(p0: string): number;
    webui_free(p0: number): void;
    webui_malloc(p0: number): number;
    webui_send_raw(p0: number,p1: string,p2: TypedArray,p3: number): void;
    webui_set_hide(p0: number,p1: number): void;
    webui_set_size(p0: number,p1: number,p2: number): void;
    webui_set_position(p0: number,p1: number,p2: number): void;
    webui_get_url(p0: number): number;
    webui_set_public(p0: number,p1: number): void;
    webui_navigate(p0: number,p1: string): void;
    webui_delete_all_profiles(): void;
    webui_delete_profile(p0: number): void;
    webui_get_parent_process_id(p0: number): number;
    webui_get_child_process_id(p0: number): number;
    webui_set_port(p0: number,p1: number): number;
    webui_set_runtime(p0: number,p1: number): void;
  };
  hescape: {
    hesc_escape_html(p0: number,p1: string,p2: number): number;
  };
  pico: {
    parseRequest(p0: TypedArray,p1: number,p2: TypedArray): number;
    parseRequest2(p0: number,p1: number,p2: number): number;
    parseResponse(p0: TypedArray,p1: number,p2: TypedArray): number;
    parseResponse2(p0: number,p1: number,p2: number): number;
    parse_request(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number,p7: number,p8: number,p9: number): number;
    parse_response(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number,p7: number,p8: number): number;
    decode_chunked(p0: number,p1: number,p2: number): number;
    phr_chunked_decoder: number;
  };
  libssl: {
    OpenSSL_version(p0: number): number;
    EVP_PKEY_CTX_new_id(p0: number,p1: number): number;
    EVP_PKEY_keygen_init(p0: number): number;
    EVP_PKEY_keygen(p0: number,p1: number): number;
    EVP_PKEY_new(): number;
    EVP_PKEY_id(p0: number): number;
    EVP_PKEY_type(p0: number): number;
    EVP_PKEY_free(p0: number): void;
    EVP_PKEY_CTX_free(p0: number): void;
    EVP_MD_CTX_new(): number;
    EVP_MD_CTX_reset(p0: number): number;
    EVP_MD_CTX_free(p0: number): void;
    EVP_get_digestbynid(p0: number): number;
    EVP_get_digestbyname(p0: string): number;
    EVP_Digest(p0: TypedArray,p1: number,p2: TypedArray,p3: TypedArray,p4: number,p5: number): number;
    EVP_DigestInit_ex(p0: number,p1: number,p2: number): number;
    EVP_DigestUpdate(p0: number,p1: number,p2: number): number;
    EVP_DigestUpdateBuffer(p0: number,p1: TypedArray,p2: number): number;
    EVP_DigestUpdateString(p0: number,p1: string,p2: number): number;
    EVP_DigestVerifyFinal(p0: number,p1: number,p2: number): number;
    EVP_DigestSignFinal(p0: number,p1: number,p2: number): number;
    EVP_DigestFinal(p0: number,p1: TypedArray,p2: Uint32Array): number;
    EVP_sha1(): number;
    EVP_sha224(): number;
    EVP_sha256(): number;
    EVP_sha384(): number;
    EVP_sha512(): number;
    EVP_sha512_256(): number;
    EVP_DigestVerifyInit(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    EVP_DigestSignInit(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    BIO_s_mem(): number;
    BIO_new(p0: number): number;
    BIO_new_mem_buf(p0: number,p1: number): number;
    BIO_ctrl(p0: number,p1: number,p2: number,p3: number): number;
    BIO_read(p0: number,p1: number,p2: number): number;
    PEM_write_bio_PrivateKey(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number): number;
    PEM_write_bio_PUBKEY(p0: number,p1: number): number;
    PEM_write_bio_X509_REQ(p0: number,p1: number): number;
    PEM_read_bio_X509(p0: number,p1: number,p2: number,p3: number): number;
    X509_get_subject_name(p0: number): number;
    X509_NAME_oneline(p0: number,p1: number,p2: number): number;
    X509_get_issuer_name(p0: number): number;
    X509_free(p0: number): void;
    X509_get_pubkey(p0: number): number;
    X509_REQ_new(): number;
    X509_REQ_set_version(p0: number,p1: number): number;
    X509_REQ_get_subject_name(p0: number): number;
    X509_NAME_add_entry_by_txt(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number): number;
    X509_REQ_set_pubkey(p0: number,p1: number): number;
    X509_REQ_sign(p0: number,p1: number,p2: number): number;
    OBJ_txt2nid(p0: number): number;
    SSL_get_error(p0: number,p1: number): number;
    OPENSSL_init_ssl(p0: number,p1: number): number;
    SSL_is_init_finished(p0: number): number;
    SSL_shutdown(p0: number): number;
    SSL_get_servername(p0: number,p1: number): number;
    SSL_get_servername_type(p0: number): number;
    SSL_free(p0: number): void;
    SSL_read(p0: number,p1: number,p2: number): number;
    SSL_write(p0: number,p1: number,p2: number): number;
    SSL_write_string(p0: number,p1: string,p2: number): number;
    SSL_get_version(p0: number): number;
    SSL_CIPHER_get_name(p0: number): number;
    SSL_get_current_cipher(p0: number): number;
    SSL_get_peer_certificate(p0: number): number;
    SSL_set_SSL_CTX(p0: number,p1: number): number;
    SSL_new(p0: number): number;
    SSL_set_fd(p0: number,p1: number): number;
    SSL_set_bio(p0: number,p1: number,p2: number): void;
    SSL_set_accept_state(p0: number): void;
    SSL_connect(p0: number): number;
    SSL_accept(p0: number): number;
    SSL_set_connect_state(p0: number): void;
    SSL_do_handshake(p0: number): number;
    SSL_CTX_new(p0: number): number;
    SSL_CTX_use_certificate_file(p0: number,p1: number,p2: number): number;
    SSL_CTX_use_certificate_chain_file(p0: number,p1: number): number;
    SSL_CTX_use_PrivateKey_file(p0: number,p1: number,p2: number): number;
    SSL_CTX_set_options(p0: number,p1: number): number;
    SSL_CTX_set_cipher_list(p0: number,p1: string): number;
    SSL_pending(p0: number): number;
    SSL_has_pending(p0: number): number;
    SSL_set_cipher_list(p0: number,p1: string): number;
    SSL_CTX_free(p0: number): void;
    TLS_server_method(): number;
    TLS_client_method(): number;
    SSL_CTX_set_ciphersuites(p0: number,p1: string): number;
    SSL_ctrl(p0: number,p1: number,p2: number,p3: number): number;
    RSA_pkey_ctx_ctrl(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    EVP_sha512_224(): number;
    X509_new(): number;
    ASN1_INTEGER_set(p0: number,p1: number): number;
    X509_get_serialNumber(p0: number): number;
    X509_time_adj_ex(p0: number,p1: number,p2: number,p3: number): number;
    X509_gmtime_adj(p0: number,p1: number): number;
    X509_getm_notBefore(p0: number): number;
    X509_getm_notAfter(p0: number): number;
    X509_set_pubkey(p0: number,p1: number): number;
    X509_sign(p0: number,p1: number,p2: number): number;
    PEM_write_bio_X509(p0: number,p1: number): number;
    X509_set_issuer_name(p0: number,p1: number): number;
    SSL_CTX_set_verify(p0: number,p1: number,p2: number): void;
    SSL_CTX_set_read_ahead(p0: number,p1: number): void;
    SSL_CTX_set_mode(p0: number,p1: number): number;
    SSL_OP_ALL: number;
    SSL_OP_NO_RENEGOTIATION: number;
    SSL_OP_NO_SSLv3: number;
    SSL_OP_NO_TLSv1: number;
    SSL_OP_NO_TLSv1_1: number;
    SSL_OP_NO_DTLSv1: number;
    SSL_OP_NO_DTLSv1_2: number;
    SSL_OP_NO_TLSv1_2: number;
    SSL_OP_NO_SSLv2: number;
    SSL_OP_NO_COMPRESSION: number;
    OPENSSL_VERSION_MAJOR: number;
    SSL_ERROR_WANT_READ: number;
    SSL_ERROR_WANT_WRITE: number;
    SSL_ERROR_SSL: number;
    SSL_ERROR_WANT_X509_LOOKUP: number;
    SSL_ERROR_WANT_CONNECT: number;
    SSL_ERROR_WANT_ACCEPT: number;
    EVP_PKEY_RSA: number;
    EVP_PKEY_OP_KEYGEN: number;
    EVP_PKEY_CTRL_RSA_KEYGEN_BITS: number;
    BIO_CTRL_PENDING: number;
    SSL_FILETYPE_PEM: number;
    SSL_VERIFY_NONE: number;
    SSL_MODE_RELEASE_BUFFERS: number;
    SSL_MODE_ACCEPT_MOVING_WRITE_BUFFER: number;
  };
  boringssl: {
    OpenSSL_version(p0: number): number;
    EVP_PKEY_CTX_new_id(p0: number,p1: number): number;
    EVP_PKEY_keygen_init(p0: number): number;
    EVP_PKEY_keygen(p0: number,p1: number): number;
    EVP_PKEY_new(): number;
    EVP_PKEY_id(p0: number): number;
    EVP_PKEY_type(p0: number): number;
    EVP_PKEY_free(p0: number): void;
    EVP_PKEY_CTX_free(p0: number): void;
    EVP_MD_CTX_new(): number;
    EVP_MD_CTX_reset(p0: number): number;
    EVP_MD_CTX_free(p0: number): void;
    EVP_get_digestbynid(p0: number): number;
    EVP_get_digestbyname(p0: string): number;
    EVP_Digest(p0: TypedArray,p1: number,p2: TypedArray,p3: TypedArray,p4: number,p5: number): number;
    EVP_DigestInit_ex(p0: number,p1: number,p2: number): number;
    EVP_DigestUpdate(p0: number,p1: number,p2: number): number;
    EVP_DigestUpdateBuffer(p0: number,p1: TypedArray,p2: number): number;
    EVP_DigestUpdateString(p0: number,p1: string,p2: number): number;
    EVP_DigestVerifyFinal(p0: number,p1: number,p2: number): number;
    EVP_DigestSignFinal(p0: number,p1: number,p2: number): number;
    EVP_DigestFinal(p0: number,p1: TypedArray,p2: Uint32Array): number;
    EVP_sha1(): number;
    EVP_sha224(): number;
    EVP_sha256(): number;
    EVP_sha384(): number;
    EVP_sha512(): number;
    EVP_sha512_256(): number;
    EVP_DigestVerifyInit(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    EVP_DigestSignInit(p0: number,p1: number,p2: number,p3: number,p4: number): number;
    BIO_s_mem(): number;
    BIO_new(p0: number): number;
    BIO_new_mem_buf(p0: number,p1: number): number;
    BIO_ctrl(p0: number,p1: number,p2: number,p3: number): number;
    BIO_read(p0: number,p1: number,p2: number): number;
    PEM_write_bio_PrivateKey(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number): number;
    PEM_write_bio_PUBKEY(p0: number,p1: number): number;
    PEM_write_bio_X509_REQ(p0: number,p1: number): number;
    PEM_read_bio_X509(p0: number,p1: number,p2: number,p3: number): number;
    X509_get_subject_name(p0: number): number;
    X509_NAME_oneline(p0: number,p1: number,p2: number): number;
    X509_get_issuer_name(p0: number): number;
    X509_free(p0: number): void;
    X509_get_pubkey(p0: number): number;
    X509_REQ_new(): number;
    X509_REQ_set_version(p0: number,p1: number): number;
    X509_REQ_get_subject_name(p0: number): number;
    X509_NAME_add_entry_by_txt(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: number): number;
    X509_REQ_set_pubkey(p0: number,p1: number): number;
    X509_REQ_sign(p0: number,p1: number,p2: number): number;
    OBJ_txt2nid(p0: number): number;
    SSL_get_error(p0: number,p1: number): number;
    OPENSSL_init_ssl(p0: number,p1: number): number;
    SSL_is_init_finished(p0: number): number;
    SSL_shutdown(p0: number): number;
    SSL_get_servername(p0: number,p1: number): number;
    SSL_get_servername_type(p0: number): number;
    SSL_free(p0: number): void;
    SSL_read(p0: number,p1: number,p2: number): number;
    SSL_write(p0: number,p1: number,p2: number): number;
    SSL_write_string(p0: number,p1: string,p2: number): number;
    SSL_get_version(p0: number): number;
    SSL_CIPHER_get_name(p0: number): number;
    SSL_get_current_cipher(p0: number): number;
    SSL_get_peer_certificate(p0: number): number;
    SSL_set_SSL_CTX(p0: number,p1: number): number;
    SSL_new(p0: number): number;
    SSL_set_fd(p0: number,p1: number): number;
    SSL_set_bio(p0: number,p1: number,p2: number): void;
    SSL_set_accept_state(p0: number): void;
    SSL_connect(p0: number): number;
    SSL_accept(p0: number): number;
    SSL_set_connect_state(p0: number): void;
    SSL_do_handshake(p0: number): number;
    SSL_CTX_new(p0: number): number;
    SSL_CTX_use_certificate_file(p0: number,p1: number,p2: number): number;
    SSL_CTX_use_certificate_chain_file(p0: number,p1: number): number;
    SSL_CTX_use_PrivateKey_file(p0: number,p1: number,p2: number): number;
    SSL_CTX_set_options(p0: number,p1: number): number;
    SSL_CTX_set_cipher_list(p0: number,p1: string): number;
    SSL_set_cipher_list(p0: number,p1: string): number;
    SSL_CTX_free(p0: number): void;
    TLS_server_method(): number;
    TLS_client_method(): number;
    X509_new(): number;
    ASN1_INTEGER_set(p0: number,p1: number): number;
    X509_get_serialNumber(p0: number): number;
    X509_time_adj_ex(p0: number,p1: number,p2: number,p3: number): number;
    X509_gmtime_adj(p0: number,p1: number): number;
    X509_getm_notBefore(p0: number): number;
    X509_getm_notAfter(p0: number): number;
    X509_set_pubkey(p0: number,p1: number): number;
    X509_sign(p0: number,p1: number,p2: number): number;
    PEM_write_bio_X509(p0: number,p1: number): number;
    X509_set_issuer_name(p0: number,p1: number): number;
    SSL_CTX_set_read_ahead(p0: number,p1: number): void;
    SSL_pending(p0: number): number;
    SSL_has_pending(p0: number): number;
    SSL_OP_ALL: number;
    SSL_OP_NO_RENEGOTIATION: number;
    SSL_OP_NO_SSLv3: number;
    SSL_OP_NO_TLSv1: number;
    SSL_OP_NO_TLSv1_1: number;
    SSL_OP_NO_DTLSv1: number;
    SSL_OP_NO_DTLSv1_2: number;
    SSL_OP_NO_TLSv1_2: number;
    SSL_OP_NO_SSLv2: number;
    SSL_OP_NO_COMPRESSION: number;
    SSL_MODE_RELEASE_BUFFERS: number;
    OPENSSL_VERSION_NUMBER: number;
    SSL_ERROR_WANT_READ: number;
    SSL_ERROR_WANT_WRITE: number;
    SSL_ERROR_SSL: number;
    SSL_ERROR_WANT_X509_LOOKUP: number;
    SSL_ERROR_WANT_CONNECT: number;
    SSL_ERROR_WANT_ACCEPT: number;
    EVP_PKEY_RSA: number;
    BIO_CTRL_PENDING: number;
    SSL_FILETYPE_PEM: number;
  };
  ada: {
    parse(p0: number,p1: number): number;
    parse_str(p0: string,p1: number): number;
    can_parse(p0: number,p1: number): number;
    can_parse_str(p0: string,p1: number): number;
    get_components(p0: number): number;
    free(p0: number): void;
  };
  inflate: {
    inflate(p0: TypedArray,p1: number,p2: TypedArray,p3: number): number;
    inflate2(p0: number,p1: number,p2: number,p3: number): number;
  };
  core: {
/**
* The  function  dlopen()  loads  the  dynamic shared object (shared library)
* file named by the null-terminated string filename and returns an opaque
* "handle" for the loaded object.  This handle is employed with other
* functions in the dlopen API, such as dlsym(3), dladdr(3), dlinfo(3),
* and dlclose()
*
* ```js
* const handle = assert(core.dlopen('libcurl.so', core.RTLD_NOW));
* ```
* @param file_path {string} the path to the shared library file to open.
* @param flags {number} (i32) resolve symbols now (RTLD_NOW) or lazily (RTLD_LAZY)
*/
// man: https://man7.org/linux/man-pages/man3/dlopen.3.html,https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man3/dlopen.3.html
    dlopen(p0: string,p1: number): number;
    dlsym(p0: number,p1: string): number;
    dlclose(p0: number): number;
    read(p0: number,p1: TypedArray,p2: number): number;
    read2(p0: number,p1: number,p2: number): number;
    write(p0: number,p1: TypedArray,p2: number): number;
    write_string(p0: number,p1: string,p2?: number): number;
    putchar(p0: number): number;
    close(p0: number): number;
    pread(p0: number,p1: TypedArray,p2: number,p3: number): number;
    lseek(p0: number,p1: number,p2: number): number;
    fstat(p0: number,p1: TypedArray): number;
    fcntl(p0: number,p1: number,p2: number): number;
    ftruncate(p0: number,p1: number): number;
    mknod(p0: string,p1: number,p2: number): number;
    stat(p0: string,p1: TypedArray): number;
    lstat(p0: string,p1: TypedArray): number;
    rename(p0: string,p1: string): number;
    access(p0: string,p1: number): number;
    open(p0: string,p1: number,p2?: number): number;
    unlink(p0: string): number;
    openat(p0: number,p1: string,p2: number): number;
    readdir(p0: number): number;
    readlink(p0: string,p1: TypedArray,p2: number): number;
    opendir(p0: string): number;
    fstatat(p0: number,p1: string,p2: TypedArray,p3: number): number;
    mkdir(p0: string,p1: number): number;
    rmdir(p0: string): number;
    closedir(p0: number): number;
    chdir(p0: string): number;
    fchdir(p0: number): number;
    mprotect(p0: number,p1: number,p2: number): number;
    memcpy(p0: number,p1: number,p2: number): number;
    memset(p0: number,p1: number,p2: number): number;
    memmove(p0: number,p1: number,p2: number): number;
    shm_open(p0: string,p1: number,p2: number): number;
    shm_unlink(p0: string): number;
    mmap(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number): number;
    munmap(p0: number,p1: number): number;
    msync(p0: number,p1: number,p2: number): number;
    calloc(p0: number,p1: number): number;
    aligned_alloc(p0: number,p1: number): number;
    free(p0: number): void;
    fastcall(p0: number): void;
    getenv(p0: string): number;
    setenv(p0: string,p1: string,p2: number): number;
    unsetenv(p0: string): number;
    sleep(p0: number): void;
    usleep(p0: number): number;
    dup(p0: number): number;
    dup2(p0: number,p1: number): number;
    getcwd(p0: number,p1: number): number;
    getpid(): number;
    fork(): number;
    kill(p0: number,p1: number): number;
    waitpid(p0: number,p1: TypedArray,p2: number): number;
    execvp(p0: string,p1: TypedArray): number;
    execve(p0: string,p1: TypedArray,p2: TypedArray): number;
    isatty(p0: number): number;
    tcgetattr(p0: number,p1: TypedArray): number;
    tcsetattr(p0: number,p1: number,p2: TypedArray): number;
    exit(p0: number): void;
    sysconf(p0: number): number;
    getrusage(p0: number,p1: TypedArray): number;
    times(p0: TypedArray): number;
    isolate_create(p0: number,p1: Uint32Array,p2: string,p3: number,p4: string,p5: number,p6: TypedArray,p7: number,p8: number,p9: number,p10: string,p11: string,p12: number,p13: number,p14: number): number;
    isolate_context_create(p0: number,p1: number,p2: string,p3: number,p4: string,p5: number,p6: number,p7: number,p8: number,p9: number,p10: string,p11: string,p12: number,p13: number,p14: number,p15: TypedArray): void;
    isolate_context_destroy(p0: TypedArray): void;
    isolate_context_size(): number;
    isolate_start(p0: TypedArray): void;
    callback(p0: number): void;
    memmem(p0: number,p1: number,p2: number,p3: number): number;
    strnlen(p0: number,p1: number): number;
    strnlen_str(p0: string,p1: number): number;
    sync(): void;
    posix_fadvise(p0: number,p1: number,p2: number,p3: number): number;
    ioctl(p0: number,p1: number,p2: TypedArray): number;
    ioctl2(p0: number,p1: number,p2: number): number;
    ioctl3(p0: number,p1: number,p2: number): number;
    reboot(p0: number): number;
    getdents(p0: number,p1: number,p2: number): number;
    getaffinity(p0: number,p1: number,p2: number): number;
    copy_file_range(p0: number,p1: number,p2: number,p3: number,p4: number,p5: number): number;
// man: https://man7.org/linux/man-pages/man2/memfd_create.2.html
    memfd_create(p0: string,p1: number): number;
    setaffinity(p0: number,p1: number,p2: number): number;
    vfork(): number;
    vexecve(p0: string,p1: TypedArray,p2: TypedArray): number;
    vfexecve(p0: number,p1: TypedArray,p2: TypedArray): number;
    getpagesize(): number;
    madvise(p0: number,p1: number,p2: number): number;
    S_IFBLK: number;
    S_IFCHR: number;
    S_IFIFO: number;
    S_IRUSR: number;
    S_IWUSR: number;
    S_IRGRP: number;
    S_IWGRP: number;
    S_IROTH: number;
    S_IWOTH: number;
    O_RDONLY: number;
    O_WRONLY: number;
    O_CREAT: number;
    S_IRWXU: number;
    S_IRWXG: number;
    S_IXOTH: number;
    O_TRUNC: number;
    STDIN: number;
    STDOUT: number;
    STDERR: number;
    O_CLOEXEC: number;
    RUSAGE_SELF: number;
    SEEK_SET: number;
    SEEK_CUR: number;
    SEEK_END: number;
    S_IRWXO: number;
    F_OK: number;
    S_IFMT: number;
    S_IFDIR: number;
    S_IFREG: number;
    NAME_MAX: number;
    O_RDWR: number;
    O_SYNC: number;
    O_DIRECTORY: number;
    F_SETFL: number;
    O_NONBLOCK: number;
    EAGAIN: number;
    WNOHANG: number;
    SIGTERM: number;
    MAP_SHARED: number;
    MAP_ANONYMOUS: number;
    MAP_PRIVATE: number;
    MS_ASYNC: number;
    MS_SYNC: number;
    MS_INVALIDATE: number;
    _SC_CLK_TCK: number;
    F_GETFL: number;
    RTLD_NOW: number;
    RTLD_LAZY: number;
    RTLD_GLOBAL: number;
    RTLD_LOCAL: number;
    RTLD_NODELETE: number;
    RTLD_NOLOAD: number;
    RTLD_DEFAULT: number;
    RTLD_NEXT: number;
    PROT_READ: number;
    PROT_WRITE: number;
    PROT_EXEC: number;
    LINUX_REBOOT_CMD_HALT: number;
    LINUX_REBOOT_CMD_POWER_OFF: number;
    LINUX_REBOOT_CMD_RESTART: number;
    RB_POWER_OFF: number;
    EINTR: number;
    MFD_CLOEXEC: number;
    MAP_HUGETLB: number;
    MAP_HUGE_SHIFT: number;
    MADV_HUGEPAGE: number;
    MAP_FIXED: number;
    POSIX_FADV_SEQUENTIAL: number;
    POSIX_FADV_WILLNEED: number;
    POSIX_FADV_RANDOM: number;
    POSIX_FADV_DONTNEED: number;
    clock_t: number;
    cpu_set_t: number;
  };
  }
declare module "lib/bestlines/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/heap/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/mach/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/system/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/encode/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/tcc/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/fsmount/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/pthread/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/sqlite/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/kevents/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/duckdb/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/rustls/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/libffi/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/epoll/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/cfzlib/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/mbedtls/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/net/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/seccomp/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/lz4/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/zlib/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/wireguard/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/raylib/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/curl/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/webui/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/hescape/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/pico/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/libssl/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/boringssl/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/ada/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/inflate/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}
declare module "lib/core/api.js" {
  export const name: string;
  export const api: LibApi;
  export const constants: LibConstants;
  export const mac: LibPlatform | void;
  export const win: LibPlatform | void;
  export const linux: LibPlatform | void;
  export const structs: string[] | void
  export const preamble: string | void;
  export const includes: string[] | void;
  export const obj: string[] | void;
}

