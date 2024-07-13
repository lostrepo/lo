/** @type {LibApiTypedFn} */
const api_typed = (v) => v;

const api = api_typed({
/** \brief Create an MDBX environment instance.
 * \ingroup c_opening
 *
 * This function allocates memory for a \ref MDBX_env structure. To release
 * the allocated memory and discard the handle, call \ref mdbx_env_close().
 * Before the handle may be used, it must be opened using \ref mdbx_env_open().
 *
 * Various other options may also need to be set before opening the handle,
 * e.g. \ref mdbx_env_set_geometry(), \ref mdbx_env_set_maxreaders(),
 * \ref mdbx_env_set_maxdbs(), depending on usage requirements.
 *
 * \param [out] penv  The address where the new handle will be stored.
 *
 * \returns a non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_create(MDBX_env **penv);
  mdbx_env_create: {
    parameters: ['pointer'],
    pointers: ['MDBX_env **'],
    result: 'i32',
  },
/** \brief Sets the value of a extra runtime options for an environment.
 * \ingroup c_settings
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create().
 * \param [in] option  The option from \ref MDBX_option_t to set value of it.
 * \param [in] value   The value of option to be set.
 *
 * \see MDBX_option_t
 * \see mdbx_env_get_option()
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_set_option(MDBX_env *env, const MDBX_option_t option,
//   uint64_t value);
  // mdbx_env_set_option: {
  //   parameters: ['pointer', 'i32', 'pointer'],
  //   pointers: ['MDBX_env *', 'const MDBX_option_t', 'uint64_t'],
  //   result: 'i32',
  // },
/** \brief Gets the value of extra runtime options from an environment.
 * \ingroup c_settings
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create().
 * \param [in] option  The option from \ref MDBX_option_t to get value of it.
 * \param [out] pvalue The address where the option's value will be stored.
 *
 * \see MDBX_option_t
 * \see mdbx_env_get_option()
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_get_option(const MDBX_env *env,
//   const MDBX_option_t option,
//   uint64_t *pvalue);
  // mdbx_env_get_option: {
  //   parameters: ['pointer', 'i32', 'pointer'],
  //   pointers: ['const MDBX_env *', 'const MDBX_option_t', 'uint64_t *'],
  //   result: 'i32',
  // },
/** \brief Open an environment instance.
 * \ingroup c_opening
 *
 * Indifferently this function will fails or not, the \ref mdbx_env_close() must
 * be called later to discard the \ref MDBX_env handle and release associated
 * resources.
 *
 * \note On Windows the \ref mdbx_env_openW() is recommended to use.
 *
 * \param [in] env       An environment handle returned
 *                       by \ref mdbx_env_create()
 *
 * \param [in] pathname  The pathname for the database or the directory in which
 *                       the database files reside. In the case of directory it
 *                       must already exist and be writable.
 *
 * \param [in] flags     Specifies options for this environment.
 *                       This parameter must be bitwise OR'ing together
 *                       any constants described above in the \ref env_flags
 *                       and \ref sync_modes sections.
 *
 * Flags set by mdbx_env_set_flags() are also used:
 *  - \ref MDBX_ENV_DEFAULTS, \ref MDBX_NOSUBDIR, \ref MDBX_RDONLY,
 *    \ref MDBX_EXCLUSIVE, \ref MDBX_WRITEMAP, \ref MDBX_NOTLS,
 *    \ref MDBX_NORDAHEAD, \ref MDBX_NOMEMINIT, \ref MDBX_COALESCE,
 *    \ref MDBX_LIFORECLAIM. See \ref env_flags section.
 *
 *  - \ref MDBX_SYNC_DURABLE, \ref MDBX_NOMETASYNC, \ref MDBX_SAFE_NOSYNC,
 *    \ref MDBX_UTTERLY_NOSYNC. See \ref sync_modes section.
 *
 * \note `MDB_NOLOCK` flag don't supported by MDBX,
 *       try use \ref MDBX_EXCLUSIVE as a replacement.
 *
 * \note MDBX don't allow to mix processes with different \ref MDBX_SAFE_NOSYNC
 *       flags on the same environment.
 *       In such case \ref MDBX_INCOMPATIBLE will be returned.
 *
 * If the database is already exist and parameters specified early by
 * \ref mdbx_env_set_geometry() are incompatible (i.e. for instance, different
 * page size) then \ref mdbx_env_open() will return \ref MDBX_INCOMPATIBLE
 * error.
 *
 * \param [in] mode   The UNIX permissions to set on created files.
 *                    Zero value means to open existing, but do not create.
 *
 * \return A non-zero error value on failure and 0 on success,
 *         some possible errors are:
 * \retval MDBX_VERSION_MISMATCH The version of the MDBX library doesn't match
 *                            the version that created the database environment.
 * \retval MDBX_INVALID       The environment file headers are corrupted.
 * \retval MDBX_ENOENT        The directory specified by the path parameter
 *                            doesn't exist.
 * \retval MDBX_EACCES        The user didn't have permission to access
 *                            the environment files.
 * \retval MDBX_BUSY          The \ref MDBX_EXCLUSIVE flag was specified and the
 *                            environment is in use by another process,
 *                            or the current process tries to open environment
 *                            more than once.
 * \retval MDBX_INCOMPATIBLE  Environment is already opened by another process,
 *                            but with different set of \ref MDBX_SAFE_NOSYNC,
 *                            \ref MDBX_UTTERLY_NOSYNC flags.
 *                            Or if the database is already exist and parameters
 *                            specified early by \ref mdbx_env_set_geometry()
 *                            are incompatible (i.e. different pagesize, etc).
 *
 * \retval MDBX_WANNA_RECOVERY The \ref MDBX_RDONLY flag was specified but
 *                             read-write access is required to rollback
 *                             inconsistent state after a system crash.
 *
 * \retval MDBX_TOO_LARGE      Database is too large for this process,
 *                             i.e. 32-bit process tries to open >4Gb database.
 */
// LIBMDBX_API int mdbx_env_open(MDBX_env *env, const char *pathname,
//   MDBX_env_flags_t flags, mdbx_mode_t mode);
// #if defined(_WIN32) || defined(_WIN64) || defined(DOXYGEN)
// /** \copydoc mdbx_env_open()
//  * \note Available only on Windows.
//  * \see mdbx_env_open() */
// LIBMDBX_API int mdbx_env_openW(MDBX_env *env, const wchar_t *pathname,
//                                MDBX_env_flags_t flags, mdbx_mode_t mode);
// #endif /* Windows */
  mdbx_env_open0: {
    parameters: ['pointer', 'string', 'u32', 'i32'],
    pointers: ['MDBX_env *', 'const char *',, 'mdbx_mode_t'],
    result: 'i32',
    name: 'ef_mdbx_env_open'
  },
/** \brief Delete the environment's files in a proper and multiprocess-safe way.
 * \ingroup c_extra
 *
 * \note On Windows the \ref mdbx_env_deleteW() is recommended to use.
 *
 * \param [in] pathname  The pathname for the database or the directory in which
 *                       the database files reside.
 *
 * \param [in] mode      Specifies deletion mode for the environment. This
 *                       parameter must be set to one of the constants described
 *                       above in the \ref MDBX_env_delete_mode_t section.
 *
 * \note The \ref MDBX_ENV_JUST_DELETE don't supported on Windows since system
 * unable to delete a memory-mapped files.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_RESULT_TRUE   No corresponding files or directories were found,
 *                            so no deletion was performed. */
// LIBMDBX_API int mdbx_env_delete(const char *pathname,
//   MDBX_env_delete_mode_t mode);

// #if defined(_WIN32) || defined(_WIN64) || defined(DOXYGEN)
// /** \copydoc mdbx_env_delete()
// * \note Available only on Windows.
// * \see mdbx_env_delete() */
// LIBMDBX_API int mdbx_env_deleteW(const wchar_t *pathname,
//    MDBX_env_delete_mode_t mode);
// #endif /* Windows */
  // mdbx_env_delete: {
  //   parameters: ['string', 'i32'],
  //   pointers: ['const char *', 'MDBX_env_delete_mode_t'],
  //   result: 'i32',
  // },
/** \brief Copy an MDBX environment to the specified path, with options.
 * \ingroup c_extra
 *
 * This function may be used to make a backup of an existing environment.
 * No lockfile is created, since it gets recreated at need.
 * \note This call can trigger significant file size growth if run in
 * parallel with write transactions, because it employs a read-only
 * transaction. See long-lived transactions under \ref restrictions section.
 *
 * \note On Windows the \ref mdbx_env_copyW() is recommended to use.
 *
 * \param [in] env    An environment handle returned by mdbx_env_create().
 *                    It must have already been opened successfully.
 * \param [in] dest   The pathname of a file in which the copy will reside.
 *                    This file must not be already exist, but parent directory
 *                    must be writable.
 * \param [in] flags  Specifies options for this operation. This parameter
 *                    must be bitwise OR'ing together any of the constants
 *                    described here:
 *
 *  - \ref MDBX_CP_DEFAULTS
 *      Perform copy as-is without compaction, etc.
 *
 *  - \ref MDBX_CP_COMPACT
 *      Perform compaction while copying: omit free pages and sequentially
 *      renumber all pages in output. This option consumes little bit more
 *      CPU for processing, but may running quickly than the default, on
 *      account skipping free pages.
 *
 *  - \ref MDBX_CP_FORCE_DYNAMIC_SIZE
 *      Force to make resizable copy, i.e. dynamic size instead of fixed.
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_copy(MDBX_env *env, const char *dest,
//   MDBX_copy_flags_t flags);

// #if defined(_WIN32) || defined(_WIN64) || defined(DOXYGEN)
// /** \copydoc mdbx_env_copy()
// * \note Available only on Windows.
// * \see mdbx_env_copy() */
// LIBMDBX_API int mdbx_env_copyW(MDBX_env *env, const wchar_t *dest,
//    MDBX_copy_flags_t flags);
// #endif /* Windows */
  // mdbx_env_copy: {
  //   parameters: ['pointer', 'string', 'i32'],
  //   pointers: ['MDBX_env *', 'const char *', 'MDBX_copy_flags_t'],
  //   result: 'i32',
  // },
/** \brief Copy an environment to the specified file descriptor, with
 * options.
 * \ingroup c_extra
 *
 * This function may be used to make a backup of an existing environment.
 * No lockfile is created, since it gets recreated at need.
 * \see mdbx_env_copy()
 *
 * \note This call can trigger significant file size growth if run in
 *       parallel with write transactions, because it employs a read-only
 *       transaction. See long-lived transactions under \ref restrictions
 *       section.
 *
 * \note Fails if the environment has suffered a page leak and the destination
 *       file descriptor is associated with a pipe, socket, or FIFO.
 *
 * \param [in] env     An environment handle returned by mdbx_env_create().
 *                     It must have already been opened successfully.
 * \param [in] fd      The file descriptor to write the copy to. It must have
 *                     already been opened for Write access.
 * \param [in] flags   Special options for this operation. \see mdbx_env_copy()
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_copy2fd(MDBX_env *env, mdbx_filehandle_t fd,
//   MDBX_copy_flags_t flags);
  // mdbx_env_copy2fd: {
  //   parameters: ['pointer', 'i32', 'i32'],
  //   pointers: ['MDBX_env *', 'mdbx_filehandle_t', 'MDBX_copy_flags_t'],
  //   result: 'i32',
  // },
/** \brief Return statistics about the MDBX environment.
 * \ingroup c_statinfo
 *
 * At least one of `env` or `txn` argument must be non-null. If txn is passed
 * non-null then stat will be filled accordingly to the given transaction.
 * Otherwise, if txn is null, then stat will be populated by a snapshot from
 * the last committed write transaction, and at next time, other information
 * can be returned.
 *
 * Legacy mdbx_env_stat() correspond to calling \ref mdbx_env_stat_ex() with the
 * null `txn` argument.
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create()
 * \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin()
 * \param [out] stat   The address of an \ref MDBX_stat structure where
 *                     the statistics will be copied
 * \param [in] bytes   The size of \ref MDBX_stat.
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_stat_ex(const MDBX_env *env, const MDBX_txn *txn,
//   MDBX_stat *stat, size_t bytes);
  mdbx_env_stat_ex: {
    parameters: ['pointer', 'pointer', 'pointer', 'i32'],
    pointers: ['const MDBX_env *', 'const MDBX_txn *', 'MDBX_stat *', 'size_t'],
    result: 'i32',
  },
/** \brief Return information about the MDBX environment.
 * \ingroup c_statinfo
 *
 * At least one of `env` or `txn` argument must be non-null. If txn is passed
 * non-null then stat will be filled accordingly to the given transaction.
 * Otherwise, if txn is null, then stat will be populated by a snapshot from
 * the last committed write transaction, and at next time, other information
 * can be returned.
 *
 * Legacy \ref mdbx_env_info() correspond to calling \ref mdbx_env_info_ex()
 * with the null `txn` argument.
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create()
 * \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin()
 * \param [out] info   The address of an \ref MDBX_envinfo structure
 *                     where the information will be copied
 * \param [in] bytes   The size of \ref MDBX_envinfo.
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_API int mdbx_env_info_ex(const MDBX_env *env, const MDBX_txn *txn,
//   MDBX_envinfo *info, size_t bytes);
  mdbx_env_info_ex: {
    parameters: ['pointer', 'pointer', 'pointer', 'i32'],
    pointers: ['const MDBX_env *', 'const MDBX_txn *', 'MDBX_envinfo *', 'size_t'],
    result: 'i32',
  },
/** \brief Flush the environment data buffers to disk.
 * \ingroup c_extra
 *
 * Unless the environment was opened with no-sync flags (\ref MDBX_NOMETASYNC,
 * \ref MDBX_SAFE_NOSYNC and \ref MDBX_UTTERLY_NOSYNC), then
 * data is always written an flushed to disk when \ref mdbx_txn_commit() is
 * called. Otherwise \ref mdbx_env_sync() may be called to manually write and
 * flush unsynced data to disk.
 *
 * Besides, \ref mdbx_env_sync_ex() with argument `force=false` may be used to
 * provide polling mode for lazy/asynchronous sync in conjunction with
 * \ref mdbx_env_set_syncbytes() and/or \ref mdbx_env_set_syncperiod().
 *
 * \note This call is not valid if the environment was opened with MDBX_RDONLY.
 *
 * \param [in] env      An environment handle returned by \ref mdbx_env_create()
 * \param [in] force    If non-zero, force a flush. Otherwise, If force is
 *                      zero, then will run in polling mode,
 *                      i.e. it will check the thresholds that were
 *                      set \ref mdbx_env_set_syncbytes()
 *                      and/or \ref mdbx_env_set_syncperiod() and perform flush
 *                      if at least one of the thresholds is reached.
 *
 * \param [in] nonblock Don't wait if write transaction
 *                      is running by other thread.
 *
 * \returns A non-zero error value on failure and \ref MDBX_RESULT_TRUE or 0 on
 *     success. The \ref MDBX_RESULT_TRUE means no data pending for flush
 *     to disk, and 0 otherwise. Some possible errors are:
 *
 * \retval MDBX_EACCES   The environment is read-only.
 * \retval MDBX_BUSY     The environment is used by other thread
 *                       and `nonblock=true`.
 * \retval MDBX_EINVAL   An invalid parameter was specified.
 * \retval MDBX_EIO      An error occurred during the flushing/writing data
 *                       to a storage medium/disk. */
//  LIBMDBX_API int mdbx_env_sync_ex(MDBX_env *env, bool force, bool nonblock);
  mdbx_env_sync_ex: {
    parameters: ['pointer', 'bool', 'bool'],
    pointers: ['MDBX_env *',,],
    result: 'i32',
  },
/** \brief The shortcut to calling \ref mdbx_env_sync_ex() with
 * the `force=false` and `nonblock=true` arguments.
 * \ingroup c_extra */
// LIBMDBX_INLINE_API(int, mdbx_env_sync_poll, (MDBX_env * env)) {
//   return mdbx_env_sync_ex(env, false, true);
// }
  mdbx_env_sync_poll: {
    parameters: ['pointer'],
    pointers: ['MDBX_env *'],
    result: 'i32',
  },
/** \brief Sets threshold to force flush the data buffers to disk, even any of
 * \ref MDBX_SAFE_NOSYNC flag in the environment.
 * \ingroup c_settings
 * \see mdbx_env_get_syncbytes \see MDBX_opt_sync_bytes
 *
 * The threshold value affects all processes which operates with given
 * environment until the last process close environment or a new value will be
 * settled.
 *
 * Data is always written to disk when \ref mdbx_txn_commit() is called, but
 * the operating system may keep it buffered. MDBX always flushes the OS buffers
 * upon commit as well, unless the environment was opened with
 * \ref MDBX_SAFE_NOSYNC, \ref MDBX_UTTERLY_NOSYNC
 * or in part \ref MDBX_NOMETASYNC.
 *
 * The default is 0, than mean no any threshold checked, and no additional
 * flush will be made.
 *
 * \param [in] env         An environment handle returned by mdbx_env_create().
 * \param [in] threshold   The size in bytes of summary changes when
 *                         a synchronous flush would be made.
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_INLINE_API(int, mdbx_env_set_syncbytes,
//   (MDBX_env * env, size_t threshold)) {
// return mdbx_env_set_option(env, MDBX_opt_sync_bytes, threshold);
// }
  mdbx_env_set_syncbytes: {
    parameters: ['pointer', 'i32'],
    pointers: ['MDBX_env *', 'size_t'],
    result: 'i32',
  },
/** \brief Get threshold to force flush the data buffers to disk, even any of
 * \ref MDBX_SAFE_NOSYNC flag in the environment.
 * \ingroup c_statinfo
 * \see mdbx_env_set_syncbytes() \see MDBX_opt_sync_bytes
 *
 * \param [in] env       An environment handle returned
 *                       by \ref mdbx_env_create().
 * \param [out] threshold  Address of an size_t to store
 *                         the number of bytes of summary changes when
 *                         a synchronous flush would be made.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL   An invalid parameter was specified. */
// LIBMDBX_INLINE_API(int, mdbx_env_get_syncbytes,
//   (const MDBX_env *env, size_t *threshold)) {
// int rc = MDBX_EINVAL;
// if (threshold) {
// uint64_t proxy = 0;
// rc = mdbx_env_get_option(env, MDBX_opt_sync_bytes, &proxy);
// #ifdef assert
// assert(proxy <= SIZE_MAX);
// #endif /* assert */
// *threshold = (size_t)proxy;
// }
// return rc;
// }
  mdbx_env_get_syncbytes: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_env *', 'size_t *'],
    result: 'i32',
  },
/** \brief Sets relative period since the last unsteady commit to force flush
 * the data buffers to disk, even of \ref MDBX_SAFE_NOSYNC flag in the
 * environment.
 * \ingroup c_settings
 * \see mdbx_env_get_syncperiod \see MDBX_opt_sync_period
 *
 * The relative period value affects all processes which operates with given
 * environment until the last process close environment or a new value will be
 * settled.
 *
 * Data is always written to disk when \ref mdbx_txn_commit() is called, but the
 * operating system may keep it buffered. MDBX always flushes the OS buffers
 * upon commit as well, unless the environment was opened with
 * \ref MDBX_SAFE_NOSYNC or in part \ref MDBX_NOMETASYNC.
 *
 * Settled period don't checked asynchronously, but only by the
 * \ref mdbx_txn_commit() and \ref mdbx_env_sync() functions. Therefore, in
 * cases where transactions are committed infrequently and/or irregularly,
 * polling by \ref mdbx_env_sync() may be a reasonable solution to timeout
 * enforcement.
 *
 * The default is 0, than mean no any timeout checked, and no additional
 * flush will be made.
 *
 * \param [in] env   An environment handle returned by \ref mdbx_env_create().
 * \param [in] seconds_16dot16  The period in 1/65536 of second when
 *                              a synchronous flush would be made since
 *                              the last unsteady commit.
 *
 * \returns A non-zero error value on failure and 0 on success. */
// LIBMDBX_INLINE_API(int, mdbx_env_set_syncperiod,
//   (MDBX_env * env, unsigned seconds_16dot16)) {
// return mdbx_env_set_option(env, MDBX_opt_sync_period, seconds_16dot16);
// }
  mdbx_env_set_syncperiod: {
    parameters: ['pointer', 'u32'],
    pointers: ['MDBX_env *', 'unsigned'],
    result: 'i32',
  },
/** \brief Close the environment and release the memory map.
 * \ingroup c_opening
 *
 * Only a single thread may call this function. All transactions, databases,
 * and cursors must already be closed before calling this function. Attempts
 * to use any such handles after calling this function is UB and would cause
 * a `SIGSEGV`. The environment handle will be freed and must not be used again
 * after this call.
 *
 * \param [in] env        An environment handle returned by
 *                        \ref mdbx_env_create().
 *
 * \param [in] dont_sync  A dont'sync flag, if non-zero the last checkpoint
 *                        will be kept "as is" and may be still "weak" in the
 *                        \ref MDBX_SAFE_NOSYNC or \ref MDBX_UTTERLY_NOSYNC
 *                        modes. Such "weak" checkpoint will be ignored on
 *                        opening next time, and transactions since the last
 *                        non-weak checkpoint (meta-page update) will rolledback
 *                        for consistency guarantee.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_BUSY   The write transaction is running by other thread,
 *                     in such case \ref MDBX_env instance has NOT be destroyed
 *                     not released!
 *                     \note If any OTHER error code was returned then
 *                     given MDBX_env instance has been destroyed and released.
 *
 * \retval MDBX_EBADSIGN  Environment handle already closed or not valid,
 *                        i.e. \ref mdbx_env_close() was already called for the
 *                        `env` or was not created by \ref mdbx_env_create().
 *
 * \retval MDBX_PANIC  If \ref mdbx_env_close_ex() was called in the child
 *                     process after `fork()`. In this case \ref MDBX_PANIC
 *                     is expected, i.e. \ref MDBX_env instance was freed in
 *                     proper manner.
 *
 * \retval MDBX_EIO    An error occurred during the flushing/writing data
 *                     to a storage medium/disk. */
//  LIBMDBX_API int mdbx_env_close_ex(MDBX_env *env, bool dont_sync);
  mdbx_env_close_ex: {
    parameters: ['pointer', 'bool'],
    pointers: ['MDBX_env *',],
    result: 'i32',
  },
/** \brief Warms up the database by loading pages into memory, optionally lock
 * ones. \ingroup c_settings
 *
 * Depending on the specified flags, notifies OS kernel about following access,
 * force loads the database pages, including locks ones in memory or releases
 * such a lock. However, the function does not analyze the b-tree nor the GC.
 * Therefore an unused pages that are in GC handled (i.e. will be loaded) in
 * the same way as those that contain payload.
 *
 * At least one of `env` or `txn` argument must be non-null.
 *
 * \param [in] env              An environment handle returned
 *                              by \ref mdbx_env_create().
 * \param [in] txn              A transaction handle returned
 *                              by \ref mdbx_txn_begin().
 * \param [in] flags            The \ref warmup_flags, bitwise OR'ed together.
 *
 * \param [in] timeout_seconds_16dot16  Optional timeout which checking only
 *                              during explicitly peeking database pages
 *                              for loading ones if the \ref MDBX_warmup_force
 *                              option was specified.
 *
 * \returns A non-zero error value on failure and 0 on success.
 * Some possible errors are:
 *
 * \retval MDBX_ENOSYS        The system does not support requested
 * operation(s).
 *
 * \retval MDBX_RESULT_TRUE   The specified timeout is reached during load
 *                            data into memory. */
// LIBMDBX_API int mdbx_env_warmup(const MDBX_env *env, const MDBX_txn *txn,
//   MDBX_warmup_flags_t flags,
//   unsigned timeout_seconds_16dot16);
  // mdbx_env_warmup: {
  //   parameters: ['pointer', 'pointer', 'i32', 'u32'],
  //   pointers: ['const MDBX_env *','const MDBX_txn *', 'MDBX_warmup_flags_t', 'unsigned'],
  //   result: 'i32',
  // },
/** \brief Set environment flags.
 * \ingroup c_settings
 *
 * This may be used to set some flags in addition to those from
 * mdbx_env_open(), or to unset these flags.
 * \see mdbx_env_get_flags()
 *
 * \note In contrast to LMDB, the MDBX serialize threads via mutex while
 * changing the flags. Therefore this function will be blocked while a write
 * transaction running by other thread, or \ref MDBX_BUSY will be returned if
 * function called within a write transaction.
 *
 * \param [in] env      An environment handle returned
 *                      by \ref mdbx_env_create().
 * \param [in] flags    The \ref env_flags to change, bitwise OR'ed together.
 * \param [in] onoff    A non-zero value sets the flags, zero clears them.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL  An invalid parameter was specified. */
// LIBMDBX_API int mdbx_env_set_flags(MDBX_env *env, MDBX_env_flags_t flags,
//   bool onoff);
  // mdbx_env_set_flags: {
  //   parameters: ['pointer', 'i32', 'bool'],
  //   pointers: ['MDBX_env *', 'MDBX_env_flags_t',],
  //   result: 'i32',
  // },
/** \brief Get environment flags.
 * \ingroup c_statinfo
 * \see mdbx_env_set_flags()
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create().
 * \param [out] flags  The address of an integer to store the flags.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL An invalid parameter was specified. */
// LIBMDBX_API int mdbx_env_get_flags(const MDBX_env *env, unsigned *flags);
  mdbx_env_get_flags: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_env *', 'unsigned *'],
    result: 'i32',
  },
/** \brief Return the path that was used in mdbx_env_open().
 * \ingroup c_statinfo
 *
 * \note On Windows the \ref mdbx_env_get_pathW() is recommended to use.
 *
 * \param [in] env     An environment handle returned by \ref mdbx_env_create()
 * \param [out] dest   Address of a string pointer to contain the path.
 *                     This is the actual string in the environment, not a
 *                     copy. It should not be altered in any way.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL  An invalid parameter was specified. */
// LIBMDBX_API int mdbx_env_get_path(const MDBX_env *env, const char **dest);

// #if defined(_WIN32) || defined(_WIN64) || defined(DOXYGEN)
// /** \copydoc mdbx_env_get_path()
//  * \note Available only on Windows.
//  * \see mdbx_env_get_path() */
// LIBMDBX_API int mdbx_env_get_pathW(const MDBX_env *env, const wchar_t **dest);
// #endif /* Windows */
  mdbx_env_get_path: {
    parameters: ['pointer', 'buffer'],
    pointers: ['const MDBX_env *', 'const char **'],
    result: 'i32',
  },

/** \brief Return the file descriptor for the given environment.
 * \ingroup c_statinfo
 *
 * \note All MDBX file descriptors have `FD_CLOEXEC` and
 *       couldn't be used after exec() and or `fork()`.
 *
 * \param [in] env   An environment handle returned by \ref mdbx_env_create().
 * \param [out] fd   Address of a int to contain the descriptor.
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL  An invalid parameter was specified. */
// LIBMDBX_API int mdbx_env_get_fd(const MDBX_env *env, mdbx_filehandle_t *fd);
  mdbx_env_get_fd: {
    parameters: ['pointer', 'buffer'],
    pointers: ['const MDBX_env *', 'mdbx_filehandle_t *'],
    result: 'i32',
  },

/** \brief Set all size-related parameters of environment, including page size
 * and the min/max size of the memory map.
 * \ingroup c_settings
 *
 * In contrast to LMDB, the MDBX provide automatic size management of an
 * database according the given parameters, including shrinking and resizing
 * on the fly. From user point of view all of these just working. Nevertheless,
 * it is reasonable to know some details in order to make optimal decisions
 * when choosing parameters.
 *
 * \see mdbx_env_info_ex()
 *
 * Both \ref mdbx_env_set_geometry() and legacy \ref mdbx_env_set_mapsize() are
 * inapplicable to read-only opened environment.
 *
 * Both \ref mdbx_env_set_geometry() and legacy \ref mdbx_env_set_mapsize()
 * could be called either before or after \ref mdbx_env_open(), either within
 * the write transaction running by current thread or not:
 *
 *  - In case \ref mdbx_env_set_geometry() or legacy \ref mdbx_env_set_mapsize()
 *    was called BEFORE \ref mdbx_env_open(), i.e. for closed environment, then
 *    the specified parameters will be used for new database creation,
 *    or will be applied during opening if database exists and no other process
 *    using it.
 *
 *    If the database is already exist, opened with \ref MDBX_EXCLUSIVE or not
 *    used by any other process, and parameters specified by
 *    \ref mdbx_env_set_geometry() are incompatible (i.e. for instance,
 *    different page size) then \ref mdbx_env_open() will return
 *    \ref MDBX_INCOMPATIBLE error.
 *
 *    In another way, if database will opened read-only or will used by other
 *    process during calling \ref mdbx_env_open() that specified parameters will
 *    silently discarded (open the database with \ref MDBX_EXCLUSIVE flag
 *    to avoid this).
 *
 *  - In case \ref mdbx_env_set_geometry() or legacy \ref mdbx_env_set_mapsize()
 *    was called after \ref mdbx_env_open() WITHIN the write transaction running
 *    by current thread, then specified parameters will be applied as a part of
 *    write transaction, i.e. will not be completely visible to any others
 *    processes until the current write transaction has been committed by the
 *    current process. However, if transaction will be aborted, then the
 *    database file will be reverted to the previous size not immediately, but
 *    when a next transaction will be committed or when the database will be
 *    opened next time.
 *
 *  - In case \ref mdbx_env_set_geometry() or legacy \ref mdbx_env_set_mapsize()
 *    was called after \ref mdbx_env_open() but OUTSIDE a write transaction,
 *    then MDBX will execute internal pseudo-transaction to apply new parameters
 *    (but only if anything has been changed), and changes be visible to any
 *    others processes immediately after successful completion of function.
 *
 * Essentially a concept of "automatic size management" is simple and useful:
 *  - There are the lower and upper bounds of the database file size;
 *  - There is the growth step by which the database file will be increased,
 *    in case of lack of space;
 *  - There is the threshold for unused space, beyond which the database file
 *    will be shrunk;
 *  - The size of the memory map is also the maximum size of the database;
 *  - MDBX will automatically manage both the size of the database and the size
 *    of memory map, according to the given parameters.
 *
 * So, there some considerations about choosing these parameters:
 *  - The lower bound allows you to prevent database shrinking below certain
 *    reasonable size to avoid unnecessary resizing costs.
 *  - The upper bound allows you to prevent database growth above certain
 *    reasonable size. Besides, the upper bound defines the linear address space
 *    reservation in each process that opens the database. Therefore changing
 *    the upper bound is costly and may be required reopening environment in
 *    case of \ref MDBX_UNABLE_EXTEND_MAPSIZE errors, and so on. Therefore, this
 *    value should be chosen reasonable large, to accommodate future growth of
 *    the database.
 *  - The growth step must be greater than zero to allow the database to grow,
 *    but also reasonable not too small, since increasing the size by little
 *    steps will result a large overhead.
 *  - The shrink threshold must be greater than zero to allow the database
 *    to shrink but also reasonable not too small (to avoid extra overhead) and
 *    not less than growth step to avoid up-and-down flouncing.
 *  - The current size (i.e. `size_now` argument) is an auxiliary parameter for
 *    simulation legacy \ref mdbx_env_set_mapsize() and as workaround Windows
 *    issues (see below).
 *
 * Unfortunately, Windows has is a several issue
 * with resizing of memory-mapped file:
 *  - Windows unable shrinking a memory-mapped file (i.e memory-mapped section)
 *    in any way except unmapping file entirely and then map again. Moreover,
 *    it is impossible in any way when a memory-mapped file is used more than
 *    one process.
 *  - Windows does not provide the usual API to augment a memory-mapped file
 *    (i.e. a memory-mapped partition), but only by using "Native API"
 *    in an undocumented way.
 *
 * MDBX bypasses all Windows issues, but at a cost:
 *  - Ability to resize database on the fly requires an additional lock
 *    and release `SlimReadWriteLock` during each read-only transaction.
 *  - During resize all in-process threads should be paused and then resumed.
 *  - Shrinking of database file is performed only when it used by single
 *    process, i.e. when a database closes by the last process or opened
 *    by the first.
 *  = Therefore, the size_now argument may be useful to set database size
 *    by the first process which open a database, and thus avoid expensive
 *    remapping further.
 *
 * For create a new database with particular parameters, including the page
 * size, \ref mdbx_env_set_geometry() should be called after
 * \ref mdbx_env_create() and before \ref mdbx_env_open(). Once the database is
 * created, the page size cannot be changed. If you do not specify all or some
 * of the parameters, the corresponding default values will be used. For
 * instance, the default for database size is 10485760 bytes.
 *
 * If the mapsize is increased by another process, MDBX silently and
 * transparently adopt these changes at next transaction start. However,
 * \ref mdbx_txn_begin() will return \ref MDBX_UNABLE_EXTEND_MAPSIZE if new
 * mapping size could not be applied for current process (for instance if
 * address space is busy).  Therefore, in the case of
 * \ref MDBX_UNABLE_EXTEND_MAPSIZE error you need close and reopen the
 * environment to resolve error.
 *
 * \note Actual values may be different than your have specified because of
 * rounding to specified database page size, the system page size and/or the
 * size of the system virtual memory management unit. You can get actual values
 * by \ref mdbx_env_info_ex() or see by using the tool `mdbx_chk` with the `-v`
 * option.
 *
 * Legacy \ref mdbx_env_set_mapsize() correspond to calling
 * \ref mdbx_env_set_geometry() with the arguments `size_lower`, `size_now`,
 * `size_upper` equal to the `size` and `-1` (i.e. default) for all other
 * parameters.
 *
 * \param [in] env         An environment handle returned
 *                         by \ref mdbx_env_create()
 *
 * \param [in] size_lower  The lower bound of database size in bytes.
 *                         Zero value means "minimal acceptable",
 *                         and negative means "keep current or use default".
 *
 * \param [in] size_now    The size in bytes to setup the database size for
 *                         now. Zero value means "minimal acceptable", and
 *                         negative means "keep current or use default". So,
 *                         it is recommended always pass -1 in this argument
 *                         except some special cases.
 *
 * \param [in] size_upper The upper bound of database size in bytes.
 *                        Zero value means "minimal acceptable",
 *                        and negative means "keep current or use default".
 *                        It is recommended to avoid change upper bound while
 *                        database is used by other processes or threaded
 *                        (i.e. just pass -1 in this argument except absolutely
 *                        necessary). Otherwise you must be ready for
 *                        \ref MDBX_UNABLE_EXTEND_MAPSIZE error(s), unexpected
 *                        pauses during remapping and/or system errors like
 *                        "address busy", and so on. In other words, there
 *                        is no way to handle a growth of the upper bound
 *                        robustly because there may be a lack of appropriate
 *                        system resources (which are extremely volatile in
 *                        a multi-process multi-threaded environment).
 *
 * \param [in] growth_step  The growth step in bytes, must be greater than
 *                          zero to allow the database to grow. Negative value
 *                          means "keep current or use default".
 *
 * \param [in] shrink_threshold  The shrink threshold in bytes, must be greater
 *                               than zero to allow the database to shrink and
 *                               greater than growth_step to avoid shrinking
 *                               right after grow.
 *                               Negative value means "keep current
 *                               or use default". Default is 2*growth_step.
 *
 * \param [in] pagesize          The database page size for new database
 *                               creation or -1 otherwise. Once the database
 *                               is created, the page size cannot be changed.
 *                               Must be power of 2 in the range between
 *                               \ref MDBX_MIN_PAGESIZE and
 *                               \ref MDBX_MAX_PAGESIZE. Zero value means
 *                               "minimal acceptable", and negative means
 *                               "keep current or use default".
 *
 * \returns A non-zero error value on failure and 0 on success,
 *          some possible errors are:
 * \retval MDBX_EINVAL    An invalid parameter was specified,
 *                        or the environment has an active write transaction.
 * \retval MDBX_EPERM     Two specific cases for Windows:
 *                        1) Shrinking was disabled before via geometry settings
 *                        and now it enabled, but there are reading threads that
 *                        don't use the additional `SRWL` (which is required to
 *                        avoid Windows issues).
 *                        2) Temporary close memory mapped is required to change
 *                        geometry, but there read transaction(s) is running
 *                        and no corresponding thread(s) could be suspended
 *                        since the \ref MDBX_NOTLS mode is used.
 * \retval MDBX_EACCESS   The environment opened in read-only.
 * \retval MDBX_MAP_FULL  Specified size smaller than the space already
 *                        consumed by the environment.
 * \retval MDBX_TOO_LARGE Specified size is too large, i.e. too many pages for
 *                        given size, or a 32-bit process requests too much
 *                        bytes for the 32-bit address space. */
// LIBMDBX_API int mdbx_env_set_geometry(MDBX_env *env, intptr_t size_lower,
//                                       intptr_t size_now, intptr_t size_upper,
//                                       intptr_t growth_step,
//                                       intptr_t shrink_threshold,
//                                       intptr_t pagesize);
  mdbx_env_set_geometry0: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_env *', ],
    result: 'i32',
    name: 'fixed_intptr_t_mdbx_env_set_geometry'
  },
/** \brief Find out whether to use readahead or not, based on the given database
 * size and the amount of available memory.
 * \ingroup c_extra
 *
 * \param [in] volume      The expected database size in bytes.
 * \param [in] redundancy  Additional reserve or overload in case of negative
 *                         value.
 *
 * \returns A \ref MDBX_RESULT_TRUE or \ref MDBX_RESULT_FALSE value,
 *          otherwise the error code:
 * \retval MDBX_RESULT_TRUE   Readahead is reasonable.
 * \retval MDBX_RESULT_FALSE  Readahead is NOT reasonable,
 *                            i.e. \ref MDBX_NORDAHEAD is useful to
 *                            open environment by \ref mdbx_env_open().
 * \retval Otherwise the error code. */
// LIBMDBX_API int mdbx_is_readahead_reasonable(size_t volume,
//   intptr_t redundancy);
  mdbx_is_readahead_reasonable: {
    parameters: ['i32', 'i32'],
    pointers: ['size_t', 'intptr_t'],
    result: 'i32',
  },




/** \brief Setup global log-level, debug options and debug logger.
 * \returns The previously `debug_flags` in the 0-15 bits
 *          and `log_level` in the 16-31 bits. */
/* LIBMDBX_API int mdbx_setup_debug(MDBX_log_level_t log_level,
  MDBX_debug_flags_t debug_flags,
  MDBX_debug_func *logger); */
  // mdbx_setup_debug: {
  //   parameters: ['u32', 'u32', 'pointer'],
  //   pointers: ['MDBX_log_level_t', 'MDBX_debug_flags_t', 'MDBX_debug_func *'],
  //   result: 'i32'
  // },
/** \brief Set or reset the assert() callback of the environment.
*
* Does nothing if libmdbx was built with MDBX_DEBUG=0 or with NDEBUG,
* and will return `MDBX_ENOSYS` in such case.
*
* \param [in] env   An environment handle returned by mdbx_env_create().
* \param [in] func  An MDBX_assert_func function, or 0.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_env_set_assert(MDBX_env *env, MDBX_assert_func *func); */
  mdbx_env_set_assert: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_env *', 'MDBX_assert_func *'],
    result: 'i32'
  },
/** \brief Dump given MDBX_val to the buffer
*
* Dumps it as string if value is printable (all bytes in the range 0x20..0x7E),
* otherwise made hexadecimal dump. Requires at least 4 byte length buffer.
*
* \returns One of:
*  - NULL if given buffer size less than 4 bytes;
*  - pointer to constant string if given value NULL or empty;
*  - otherwise pointer to given buffer. */
/* LIBMDBX_API const char *mdbx_dump_val(const MDBX_val *key, char *const buf,
       const size_t bufsize); */
  // mdbx_dump_val: {
  //   parameters: ['pointer', 'pointer', 'i32'],
  //   pointers: ['const MDBX_val *', 'char *const', 'const size_t'],
  //   result: 'pointer',
  //   rpointer: 'const char *'
  // },
/** \brief Return a string describing a given error code.
* \ingroup c_err
*
* This function is a superset of the ANSI C X3.159-1989 (ANSI C) `strerror()`
* function. If the error code is greater than or equal to 0, then the string
* returned by the system function `strerror()` is returned. If the error code
* is less than 0, an error string corresponding to the MDBX library error is
* returned. See errors for a list of MDBX-specific error codes.
*
* `mdbx_strerror()` is NOT thread-safe because may share common internal buffer
* for system messages. The returned string must NOT be modified by the
* application, but MAY be modified by a subsequent call to
* \ref mdbx_strerror(), `strerror()` and other related functions.
* \see mdbx_strerror_r()
*
* \param [in] errnum  The error code.
*
* \returns "error message" The description of the error. */
/* LIBMDBX_API const char *mdbx_strerror(int errnum); */
  mdbx_strerror: {
    parameters: ['i32'],
    result: 'pointer',
    rpointer: 'const char *'
  },
/** \brief Return a string describing a given error code.
* \ingroup c_err
*
* This function is a superset of the ANSI C X3.159-1989 (ANSI C) `strerror()`
* function. If the error code is greater than or equal to 0, then the string
* returned by the system function `strerror()` is returned. If the error code
* is less than 0, an error string corresponding to the MDBX library error is
* returned. See errors for a list of MDBX-specific error codes.
*
* `mdbx_strerror_r()` is thread-safe since uses user-supplied buffer where
* appropriate. The returned string must NOT be modified by the application,
* since it may be pointer to internal constant string. However, there is no
* restriction if the returned string points to the supplied buffer.
* \see mdbx_strerror()
*
* mdbx_liberr2str() returns string describing only MDBX error numbers but NULL
* for non-MDBX error codes. This function is thread-safe since return pointer
* to constant non-localized strings.
*
* \param [in] errnum  The error code.
* \param [in,out] buf Buffer to store the error message.
* \param [in] buflen The size of buffer to store the message.
*
* \returns "error message" The description of the error. */
/* LIBMDBX_API const char *mdbx_strerror_r(int errnum, char *buf, size_t buflen); */
  mdbx_strerror_r: {
    parameters: ['i32', 'pointer', 'i32'],
    pointers: [, 'char *',],
    result: 'pointer',
    rpointer: 'const char *'
  },
/** \brief Returns basic information about system RAM.
* This function provides a portable way to get information about available RAM
* and can be useful in that it returns the same information that libmdbx uses
* internally to adjust various options and control readahead.
* \ingroup c_statinfo
*
* \param [out] page_size     Optional address where the system page size
*                            will be stored.
* \param [out] total_pages   Optional address where the number of total RAM
*                            pages will be stored.
* \param [out] avail_pages   Optional address where the number of
*                            available/free RAM pages will be stored.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_get_sysraminfo(intptr_t *page_size, intptr_t *total_pages,
     intptr_t *avail_pages); */
  mdbx_get_sysraminfo: {
    parameters: ['pointer', 'pointer', 'pointer'],
    pointers: ['intptr_t *', 'intptr_t *', 'intptr_t *'],
    result: 'i32'
  },
/** \brief Sets application information (a context pointer) associated with
* the environment.
* \see mdbx_env_get_userctx()
* \ingroup c_settings
*
* \param [in] env  An environment handle returned by \ref mdbx_env_create().
* \param [in] ctx  An arbitrary pointer for whatever the application needs.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_env_set_userctx(MDBX_env *env, void *ctx); */
  mdbx_env_set_userctx: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_env *', 'void *'],
    result: 'i32'
  },
/** \brief Create a transaction with a user provided context pointer
* for use with the environment.
* \ingroup c_transactions
*
* The transaction handle may be discarded using \ref mdbx_txn_abort()
* or \ref mdbx_txn_commit().
* \see mdbx_txn_begin()
*
* \note A transaction and its cursors must only be used by a single thread,
* and a thread may only have a single transaction at a time. If \ref MDBX_NOTLS
* is in use, this does not apply to read-only transactions.
*
* \note Cursors may not span transactions.
*
* \param [in] env     An environment handle returned by \ref mdbx_env_create().
*
* \param [in] parent  If this parameter is non-NULL, the new transaction will
*                     be a nested transaction, with the transaction indicated
*                     by parent as its parent. Transactions may be nested
*                     to any level. A parent transaction and its cursors may
*                     not issue any other operations than mdbx_txn_commit and
*                     \ref mdbx_txn_abort() while it has active child
*                     transactions.
*
* \param [in] flags   Special options for this transaction. This parameter
*                     must be set to 0 or by bitwise OR'ing together one
*                     or more of the values described here:
*                      - \ref MDBX_RDONLY   This transaction will not perform
*                                           any write operations.
*
*                      - \ref MDBX_TXN_TRY  Do not block when starting
*                                           a write transaction.
*
*                      - \ref MDBX_SAFE_NOSYNC, \ref MDBX_NOMETASYNC.
*                        Do not sync data to disk corresponding
*                        to \ref MDBX_NOMETASYNC or \ref MDBX_SAFE_NOSYNC
*                        description. \see sync_modes
*
* \param [out] txn    Address where the new \ref MDBX_txn handle
*                     will be stored.
*
* \param [in] context A pointer to application context to be associated with
*                     created transaction and could be retrieved by
*                     \ref mdbx_txn_get_userctx() until transaction finished.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_PANIC         A fatal error occurred earlier and the
*                            environment must be shut down.
* \retval MDBX_UNABLE_EXTEND_MAPSIZE  Another process wrote data beyond
*                                     this MDBX_env's mapsize and this
*                                     environment map must be resized as well.
*                                     See \ref mdbx_env_set_mapsize().
* \retval MDBX_READERS_FULL  A read-only transaction was requested and
*                            the reader lock table is full.
*                            See \ref mdbx_env_set_maxreaders().
* \retval MDBX_ENOMEM        Out of memory.
* \retval MDBX_BUSY          The write transaction is already started by the
*                            current thread. */
/* LIBMDBX_API int mdbx_txn_begin_ex(MDBX_env *env, MDBX_txn *parent,
   MDBX_txn_flags_t flags, MDBX_txn **txn,
   void *context); */
  mdbx_txn_begin_ex0: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['MDBX_env *',  , 'MDBX_txn **', 'void *'],
    result: 'i32',
    name: 'ef_mdbx_txn_begin_ex'
  },
  mdbx_txn_begin_ex1: {
    parameters: ['pointer', 'pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['MDBX_env *', 'MDBX_txn *', , 'MDBX_txn **', 'void *'],
    result: 'i32',
    name: 'ef_mdbx_txn_begin_ex'
  },
/** \brief Sets application information associated (a context pointer) with the
* transaction.
* \ingroup c_transactions
* \see mdbx_txn_get_userctx()
*
* \param [in] txn  An transaction handle returned by \ref mdbx_txn_begin_ex()
*                  or \ref mdbx_txn_begin().
* \param [in] ctx  An arbitrary pointer for whatever the application needs.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_txn_set_userctx(MDBX_txn *txn, void *ctx); */
  mdbx_txn_set_userctx: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_txn *', 'void *'],
    result: 'i32'
  },
/** \brief Return information about the MDBX transaction.
* \ingroup c_statinfo
*
* \param [in] txn        A transaction handle returned by \ref mdbx_txn_begin()
* \param [out] info      The address of an \ref MDBX_txn_info structure
*                        where the information will be copied.
* \param [in] scan_rlt   The boolean flag controls the scan of the read lock
*                        table to provide complete information. Such scan
*                        is relatively expensive and you can avoid it
*                        if corresponding fields are not needed.
*                        See description of \ref MDBX_txn_info.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_txn_info(const MDBX_txn *txn, MDBX_txn_info *info,
bool scan_rlt); */
  mdbx_txn_info: {
    parameters: ['pointer', 'pointer', 'bool'],
    pointers: ['const MDBX_txn *', 'MDBX_txn_info *',],
    result: 'i32'
  },
/** \brief Commit all the operations of a transaction into the database and
* collect latency information.
* \see mdbx_txn_commit()
* \ingroup c_transactions
* \warning This function may be changed in future releases. */
/* LIBMDBX_API int mdbx_txn_commit_ex(MDBX_txn *txn, MDBX_commit_latency *latency); */
  mdbx_txn_commit_ex: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_txn *', 'MDBX_commit_latency *'],
    result: 'i32'
  },
/** \brief Abandon all the operations of the transaction instead of saving them.
* \ingroup c_transactions
*
* The transaction handle is freed. It and its cursors must not be used again
* after this call, except with \ref mdbx_cursor_renew() and
* \ref mdbx_cursor_close().
*
* If the current thread is not eligible to manage the transaction then
* the \ref MDBX_THREAD_MISMATCH error will returned. Otherwise the transaction
* will be aborted and its handle is freed. Thus, a result other than
* \ref MDBX_THREAD_MISMATCH means that the transaction is terminated:
*  - Resources are released;
*  - Transaction handle is invalid;
*  - Cursor(s) associated with transaction must not be used, except with
*    \ref mdbx_cursor_renew() and \ref mdbx_cursor_close().
*    Such cursor(s) must be closed explicitly by \ref mdbx_cursor_close()
*    before or after transaction abort, either can be reused with
*    \ref mdbx_cursor_renew() until it will be explicitly closed by
*    \ref mdbx_cursor_close().
*
* \param [in] txn  A transaction handle returned by \ref mdbx_txn_begin().
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_PANIC            A fatal error occurred earlier and
*                               the environment must be shut down.
* \retval MDBX_BAD_TXN          Transaction is already finished or never began.
* \retval MDBX_EBADSIGN         Transaction object has invalid signature,
*                               e.g. transaction was already terminated
*                               or memory was corrupted.
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL           Transaction handle is NULL. */
/* LIBMDBX_API int mdbx_txn_abort(MDBX_txn *txn); */
  mdbx_txn_abort: {
    parameters: ['pointer'],
    pointers: ['MDBX_txn *'],
    result: 'i32'
  },
/** \brief Marks transaction as broken.
* \ingroup c_transactions
*
* Function keeps the transaction handle and corresponding locks, but makes
* impossible to perform any operations within a broken transaction.
* Broken transaction must then be aborted explicitly later.
*
* \param [in] txn  A transaction handle returned by \ref mdbx_txn_begin().
*
* \see mdbx_txn_abort() \see mdbx_txn_reset() \see mdbx_txn_commit()
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_txn_break(MDBX_txn *txn); */
  mdbx_txn_break: {
    parameters: ['pointer'],
    pointers: ['MDBX_txn *'],
    result: 'i32'
  },
/** \brief Reset a read-only transaction.
* \ingroup c_transactions
*
* Abort the read-only transaction like \ref mdbx_txn_abort(), but keep the
* transaction handle. Therefore \ref mdbx_txn_renew() may reuse the handle.
* This saves allocation overhead if the process will start a new read-only
* transaction soon, and also locking overhead if \ref MDBX_NOTLS is in use. The
* reader table lock is released, but the table slot stays tied to its thread
* or \ref MDBX_txn. Use \ref mdbx_txn_abort() to discard a reset handle, and to
* free its lock table slot if \ref MDBX_NOTLS is in use.
*
* Cursors opened within the transaction must not be used again after this
* call, except with \ref mdbx_cursor_renew() and \ref mdbx_cursor_close().
*
* Reader locks generally don't interfere with writers, but they keep old
* versions of database pages allocated. Thus they prevent the old pages from
* being reused when writers commit new data, and so under heavy load the
* database size may grow much more rapidly than otherwise.
*
* \param [in] txn  A transaction handle returned by \ref mdbx_txn_begin().
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_PANIC            A fatal error occurred earlier and
*                               the environment must be shut down.
* \retval MDBX_BAD_TXN          Transaction is already finished or never began.
* \retval MDBX_EBADSIGN         Transaction object has invalid signature,
*                               e.g. transaction was already terminated
*                               or memory was corrupted.
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL           Transaction handle is NULL. */
/* LIBMDBX_API int mdbx_txn_reset(MDBX_txn *txn); */
  mdbx_txn_reset: {
    parameters: ['pointer'],
    pointers: ['MDBX_txn *'],
    result: 'i32'
  },
/** \brief Renew a read-only transaction.
* \ingroup c_transactions
*
* This acquires a new reader lock for a transaction handle that had been
* released by \ref mdbx_txn_reset(). It must be called before a reset
* transaction may be used again.
*
* \param [in] txn  A transaction handle returned by \ref mdbx_txn_begin().
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_PANIC            A fatal error occurred earlier and
*                               the environment must be shut down.
* \retval MDBX_BAD_TXN          Transaction is already finished or never began.
* \retval MDBX_EBADSIGN         Transaction object has invalid signature,
*                               e.g. transaction was already terminated
*                               or memory was corrupted.
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL           Transaction handle is NULL. */
/* LIBMDBX_API int mdbx_txn_renew(MDBX_txn *txn); */
  mdbx_txn_renew: {
    parameters: ['pointer'],
    pointers: ['MDBX_txn *'],
    result: 'i32'
  },
/** \brief Set integers markers (aka "canary") associated with the environment.
* \ingroup c_crud
* \see mdbx_canary_get()
*
* \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin()
* \param [in] canary  A optional pointer to \ref MDBX_canary structure for `x`,
*              `y` and `z` values from.
*            - If canary is NOT NULL then the `x`, `y` and `z` values will be
*              updated from given canary argument, but the 'v' be always set
*              to the current transaction number if at least one `x`, `y` or
*              `z` values have changed (i.e. if `x`, `y` and `z` have the same
*              values as currently present then nothing will be changes or
*              updated).
*            - if canary is NULL then the `v` value will be explicitly update
*              to the current transaction number without changes `x`, `y` nor
*              `z`.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_canary_put(MDBX_txn *txn, const MDBX_canary *canary); */
  mdbx_canary_put: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_txn *', 'const MDBX_canary *'],
    result: 'i32'
  },
/** \brief Returns fours integers markers (aka "canary") associated with the
* environment.
* \ingroup c_crud
* \see mdbx_canary_put()
*
* \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] canary  The address of an \ref MDBX_canary structure where the
*                     information will be copied.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_canary_get(const MDBX_txn *txn, MDBX_canary *canary); */
  mdbx_canary_get: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_canary *'],
    result: 'i32'
  },
/** \brief Open or Create a database in the environment.
* \ingroup c_dbi
*
* A database handle denotes the name and parameters of a database,
* independently of whether such a database exists. The database handle may be
* discarded by calling \ref mdbx_dbi_close(). The old database handle is
* returned if the database was already open. The handle may only be closed
* once.
*
* \note A notable difference between MDBX and LMDB is that MDBX make handles
* opened for existing databases immediately available for other transactions,
* regardless this transaction will be aborted or reset. The REASON for this is
* to avoiding the requirement for multiple opening a same handles in
* concurrent read transactions, and tracking of such open but hidden handles
* until the completion of read transactions which opened them.
*
* Nevertheless, the handle for the NEWLY CREATED database will be invisible
* for other transactions until the this write transaction is successfully
* committed. If the write transaction is aborted the handle will be closed
* automatically. After a successful commit the such handle will reside in the
* shared environment, and may be used by other transactions.
*
* In contrast to LMDB, the MDBX allow this function to be called from multiple
* concurrent transactions or threads in the same process.
*
* To use named database (with name != NULL), \ref mdbx_env_set_maxdbs()
* must be called before opening the environment. Table names are
* keys in the internal unnamed database, and may be read but not written.
*
* \param [in] txn    transaction handle returned by \ref mdbx_txn_begin().
* \param [in] name   The name of the database to open. If only a single
*                    database is needed in the environment,
*                    this value may be NULL.
* \param [in] flags  Special options for this database. This parameter must
*                    be bitwise OR'ing together any of the constants
*                    described here:
*
*  - \ref MDBX_DB_DEFAULTS
*      Keys are arbitrary byte strings and compared from beginning to end.
*  - \ref MDBX_REVERSEKEY
*      Keys are arbitrary byte strings to be compared in reverse order,
*      from the end of the strings to the beginning.
*  - \ref MDBX_INTEGERKEY
*      Keys are binary integers in native byte order, either uint32_t or
*      uint64_t, and will be sorted as such. The keys must all be of the
*      same size and must be aligned while passing as arguments.
*  - \ref MDBX_DUPSORT
*      Duplicate keys may be used in the database. Or, from another point of
*      view, keys may have multiple data items, stored in sorted order. By
*      default keys must be unique and may have only a single data item.
*  - \ref MDBX_DUPFIXED
*      This flag may only be used in combination with \ref MDBX_DUPSORT. This
*      option tells the library that the data items for this database are
*      all the same size, which allows further optimizations in storage and
*      retrieval. When all data items are the same size, the
*      \ref MDBX_GET_MULTIPLE, \ref MDBX_NEXT_MULTIPLE and
*      \ref MDBX_PREV_MULTIPLE cursor operations may be used to retrieve
*      multiple items at once.
*  - \ref MDBX_INTEGERDUP
*      This option specifies that duplicate data items are binary integers,
*      similar to \ref MDBX_INTEGERKEY keys. The data values must all be of the
*      same size and must be aligned while passing as arguments.
*  - \ref MDBX_REVERSEDUP
*      This option specifies that duplicate data items should be compared as
*      strings in reverse order (the comparison is performed in the direction
*      from the last byte to the first).
*  - \ref MDBX_CREATE
*      Create the named database if it doesn't exist. This option is not
*      allowed in a read-only transaction or a read-only environment.
*
* \param [out] dbi     Address where the new \ref MDBX_dbi handle
*                      will be stored.
*
* For \ref mdbx_dbi_open_ex() additional arguments allow you to set custom
* comparison functions for keys and values (for multimaps).
* \see avoid_custom_comparators
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_NOTFOUND   The specified database doesn't exist in the
*                         environment and \ref MDBX_CREATE was not specified.
* \retval MDBX_DBS_FULL   Too many databases have been opened.
*                         \see mdbx_env_set_maxdbs()
* \retval MDBX_INCOMPATIBLE  Database is incompatible with given flags,
*                         i.e. the passed flags is different with which the
*                         database was created, or the database was already
*                         opened with a different comparison function(s).
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread. */
/* LIBMDBX_API int mdbx_dbi_open(MDBX_txn *txn, const char *name,
MDBX_db_flags_t flags, MDBX_dbi *dbi); */
  mdbx_dbi_open0: {
    parameters: ['pointer', 'string', 'u32', 'pointer'],
    pointers: ['MDBX_txn *', 'const char *', , 'MDBX_dbi *'],
    result: 'i32',
    name: 'ef_mdbx_dbi_open'
  },
  mdbx_dbi_open1: {
    parameters: ['pointer', 'u32', 'pointer'],
    pointers: ['MDBX_txn *', , 'MDBX_dbi *'],
    result: 'i32',
    name: 'ef_mdbx_dbi_open'
  },
/** \brief Retrieve statistics for a database.
* \ingroup c_statinfo
*
* \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi     A database handle returned by \ref mdbx_dbi_open().
* \param [out] stat   The address of an \ref MDBX_stat structure where
*                     the statistics will be copied.
* \param [in] bytes   The size of \ref MDBX_stat.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL   An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_dbi_stat(const MDBX_txn *txn, MDBX_dbi dbi,
MDBX_stat *stat, size_t bytes); */
  mdbx_dbi_stat: {
    parameters: ['pointer', 'u32', 'pointer', 'i32'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'MDBX_stat *', 'size_t'],
    result: 'i32'
  },
/** \brief Retrieve depth (bitmask) information of nested dupsort (multi-value)
* B+trees for given database.
* \ingroup c_statinfo
*
* \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi     A database handle returned by \ref mdbx_dbi_open().
* \param [out] mask   The address of an uint32_t value where the bitmask
*                     will be stored.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL       An invalid parameter was specified.
* \retval MDBX_RESULT_TRUE  The dbi isn't a dupsort (multi-value) database. */
/* LIBMDBX_API int mdbx_dbi_dupsort_depthmask(const MDBX_txn *txn, MDBX_dbi dbi,
            uint32_t *mask); */
  mdbx_dbi_dupsort_depthmask: {
    parameters: ['pointer', 'u32', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'uint32_t *'],
    result: 'i32'
  },
/** \brief Retrieve the DB flags and status for a database handle.
* \ingroup c_statinfo
*
* \param [in] txn     A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi     A database handle returned by \ref mdbx_dbi_open().
* \param [out] flags  Address where the flags will be returned.
* \param [out] state  Address where the state will be returned.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_dbi_flags_ex(const MDBX_txn *txn, MDBX_dbi dbi,
   unsigned *flags, unsigned *state); */
  mdbx_dbi_flags_ex: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'unsigned *', 'unsigned *'],
    result: 'i32'
  },
/** \brief Close a database handle. Normally unnecessary.
* \ingroup c_dbi
*
* Closing a database handle is not necessary, but lets \ref mdbx_dbi_open()
* reuse the handle value. Usually it's better to set a bigger
* \ref mdbx_env_set_maxdbs(), unless that value would be large.
*
* \note Use with care.
* This call is synchronized via mutex with \ref mdbx_dbi_close(), but NOT with
* other transactions running by other threads. The "next" version of libmdbx
* (\ref MithrilDB) will solve this issue.
*
* Handles should only be closed if no other threads are going to reference
* the database handle or one of its cursors any further. Do not close a handle
* if an existing transaction has modified its database. Doing so can cause
* misbehavior from database corruption to errors like \ref MDBX_BAD_DBI
* (since the DB name is gone).
*
* \param [in] env  An environment handle returned by \ref mdbx_env_create().
* \param [in] dbi  A database handle returned by \ref mdbx_dbi_open().
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_dbi_close(MDBX_env *env, MDBX_dbi dbi); */
  mdbx_dbi_close: {
    parameters: ['pointer', 'u32'],
    pointers: ['MDBX_env *', 'MDBX_dbi'],
    result: 'i32'
  },
/** \brief Empty or delete and close a database.
* \ingroup c_crud
*
* \see mdbx_dbi_close() \see mdbx_dbi_open()
*
* \param [in] txn  A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi  A database handle returned by \ref mdbx_dbi_open().
* \param [in] del  `false` to empty the DB, `true` to delete it
*                  from the environment and close the DB handle.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_drop(MDBX_txn *txn, MDBX_dbi dbi, bool del); */
  mdbx_drop: {
    parameters: ['pointer', 'u32', 'bool'],
    pointers: ['MDBX_txn *', 'MDBX_dbi', ],
    result: 'i32'
  },
/** \brief Get items from a database.
* \ingroup c_crud
*
* This function retrieves key/data pairs from the database. The address
* and length of the data associated with the specified key are returned
* in the structure to which data refers.
* If the database supports duplicate keys (\ref MDBX_DUPSORT) then the
* first data item for the key will be returned. Retrieval of other
* items requires the use of \ref mdbx_cursor_get().
*
* \note The memory pointed to by the returned values is owned by the
* database. The caller MUST not dispose of the memory, and MUST not modify it
* in any way regardless in a read-only nor read-write transactions!
* For case a database opened without the \ref MDBX_WRITEMAP modification
* attempts likely will cause a `SIGSEGV`. However, when a database opened with
* the \ref MDBX_WRITEMAP or in case values returned inside read-write
* transaction are located on a "dirty" (modified and pending to commit) pages,
* such modification will silently accepted and likely will lead to DB and/or
* data corruption.
*
* \note Values returned from the database are valid only until a
* subsequent update operation, or the end of the transaction.
*
* \param [in] txn       A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi       A database handle returned by \ref mdbx_dbi_open().
* \param [in] key       The key to search for in the database.
* \param [in,out] data  The data corresponding to the key.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_NOTFOUND  The key was not in the database.
* \retval MDBX_EINVAL    An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_get(const MDBX_txn *txn, MDBX_dbi dbi, const MDBX_val *key,
MDBX_val *data); */
  mdbx_get: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'const MDBX_val *', 'MDBX_val *'],
    result: 'i32'
  },
/** \brief Get items from a database
* and optionally number of data items for a given key.
*
* \ingroup c_crud
*
* Briefly this function does the same as \ref mdbx_get() with a few
* differences:
*  1. If values_count is NOT NULL, then returns the count
*     of multi-values/duplicates for a given key.
*  2. Updates BOTH the key and the data for pointing to the actual key-value
*     pair inside the database.
*
* \param [in] txn           A transaction handle returned
*                           by \ref mdbx_txn_begin().
* \param [in] dbi           A database handle returned by \ref mdbx_dbi_open().
* \param [in,out] key       The key to search for in the database.
* \param [in,out] data      The data corresponding to the key.
* \param [out] values_count The optional address to return number of values
*                           associated with given key:
*                            = 0 - in case \ref MDBX_NOTFOUND error;
*                            = 1 - exactly for databases
*                                  WITHOUT \ref MDBX_DUPSORT;
*                            >= 1 for databases WITH \ref MDBX_DUPSORT.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_NOTFOUND  The key was not in the database.
* \retval MDBX_EINVAL    An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_get_ex(const MDBX_txn *txn, MDBX_dbi dbi, MDBX_val *key,
MDBX_val *data, size_t *values_count); */
  mdbx_get_ex: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'MDBX_val *', 'MDBX_val *', 'size_t *'],
    result: 'i32'
  },
/** \brief Get equal or great item from a database.
* \ingroup c_crud
*
* Briefly this function does the same as \ref mdbx_get() with a few
* differences:
* 1. Return equal or great (due comparison function) key-value
*    pair, but not only exactly matching with the key.
* 2. On success return \ref MDBX_SUCCESS if key found exactly,
*    and \ref MDBX_RESULT_TRUE otherwise. Moreover, for databases with
*    \ref MDBX_DUPSORT flag the data argument also will be used to match over
*    multi-value/duplicates, and \ref MDBX_SUCCESS will be returned only when
*    BOTH the key and the data match exactly.
* 3. Updates BOTH the key and the data for pointing to the actual key-value
*    pair inside the database.
*
* \param [in] txn           A transaction handle returned
*                           by \ref mdbx_txn_begin().
* \param [in] dbi           A database handle returned by \ref mdbx_dbi_open().
* \param [in,out] key       The key to search for in the database.
* \param [in,out] data      The data corresponding to the key.
*
* \returns A non-zero error value on failure and \ref MDBX_RESULT_FALSE
*          or \ref MDBX_RESULT_TRUE on success (as described above).
*          Some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_NOTFOUND      The key was not in the database.
* \retval MDBX_EINVAL        An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_get_equal_or_great(const MDBX_txn *txn, MDBX_dbi dbi,
         MDBX_val *key, MDBX_val *data); */
  mdbx_get_equal_or_great: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'MDBX_val *', 'MDBX_val *'],
    result: 'i32'
  },
/** \brief Store items into a database.
* \ingroup c_crud
*
* This function stores key/data pairs in the database. The default behavior
* is to enter the new key/data pair, replacing any previously existing key
* if duplicates are disallowed, or adding a duplicate data item if
* duplicates are allowed (see \ref MDBX_DUPSORT).
*
* \param [in] txn        A transaction handle returned
*                        by \ref mdbx_txn_begin().
* \param [in] dbi        A database handle returned by \ref mdbx_dbi_open().
* \param [in] key        The key to store in the database.
* \param [in,out] data   The data to store.
* \param [in] flags      Special options for this operation.
*                        This parameter must be set to 0 or by bitwise OR'ing
*                        together one or more of the values described here:
*   - \ref MDBX_NODUPDATA
*      Enter the new key-value pair only if it does not already appear
*      in the database. This flag may only be specified if the database
*      was opened with \ref MDBX_DUPSORT. The function will return
*      \ref MDBX_KEYEXIST if the key/data pair already appears in the database.
*
*  - \ref MDBX_NOOVERWRITE
*      Enter the new key/data pair only if the key does not already appear
*      in the database. The function will return \ref MDBX_KEYEXIST if the key
*      already appears in the database, even if the database supports
*      duplicates (see \ref  MDBX_DUPSORT). The data parameter will be set
*      to point to the existing item.
*
*  - \ref MDBX_CURRENT
*      Update an single existing entry, but not add new ones. The function will
*      return \ref MDBX_NOTFOUND if the given key not exist in the database.
*      In case multi-values for the given key, with combination of
*      the \ref MDBX_ALLDUPS will replace all multi-values,
*      otherwise return the \ref MDBX_EMULTIVAL.
*
*  - \ref MDBX_RESERVE
*      Reserve space for data of the given size, but don't copy the given
*      data. Instead, return a pointer to the reserved space, which the
*      caller can fill in later - before the next update operation or the
*      transaction ends. This saves an extra memcpy if the data is being
*      generated later. MDBX does nothing else with this memory, the caller
*      is expected to modify all of the space requested. This flag must not
*      be specified if the database was opened with \ref MDBX_DUPSORT.
*
*  - \ref MDBX_APPEND
*      Append the given key/data pair to the end of the database. This option
*      allows fast bulk loading when keys are already known to be in the
*      correct order. Loading unsorted keys with this flag will cause
*      a \ref MDBX_EKEYMISMATCH error.
*
*  - \ref MDBX_APPENDDUP
*      As above, but for sorted dup data.
*
*  - \ref MDBX_MULTIPLE
*      Store multiple contiguous data elements in a single request. This flag
*      may only be specified if the database was opened with
*      \ref MDBX_DUPFIXED. With combination the \ref MDBX_ALLDUPS
*      will replace all multi-values.
*      The data argument must be an array of two \ref MDBX_val. The `iov_len`
*      of the first \ref MDBX_val must be the size of a single data element.
*      The `iov_base` of the first \ref MDBX_val must point to the beginning
*      of the array of contiguous data elements which must be properly aligned
*      in case of database with \ref MDBX_INTEGERDUP flag.
*      The `iov_len` of the second \ref MDBX_val must be the count of the
*      number of data elements to store. On return this field will be set to
*      the count of the number of elements actually written. The `iov_base` of
*      the second \ref MDBX_val is unused.
*
* \see \ref c_crud_hints "Quick reference for Insert/Update/Delete operations"
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_KEYEXIST  The key/value pair already exists in the database.
* \retval MDBX_MAP_FULL  The database is full, see \ref mdbx_env_set_mapsize().
* \retval MDBX_TXN_FULL  The transaction has too many dirty pages.
* \retval MDBX_EACCES    An attempt was made to write
*                        in a read-only transaction.
* \retval MDBX_EINVAL    An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_put(MDBX_txn *txn, MDBX_dbi dbi, const MDBX_val *key,
MDBX_val *data, MDBX_put_flags_t flags); */
  mdbx_put0: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer', 'u32'],
    pointers: ['MDBX_txn *', 'MDBX_dbi', 'const MDBX_val *', 'MDBX_val *', ],
    result: 'i32',
    name: 'ef_mdbx_put'
  },
/** \brief Replace items in a database.
* \ingroup c_crud
*
* This function allows to update or delete an existing value at the same time
* as the previous value is retrieved. If the argument new_data equal is NULL
* zero, the removal is performed, otherwise the update/insert.
*
* The current value may be in an already changed (aka dirty) page. In this
* case, the page will be overwritten during the update, and the old value will
* be lost. Therefore, an additional buffer must be passed via old_data
* argument initially to copy the old value. If the buffer passed in is too
* small, the function will return \ref MDBX_RESULT_TRUE by setting iov_len
* field pointed by old_data argument to the appropriate value, without
* performing any changes.
*
* For databases with non-unique keys (i.e. with \ref MDBX_DUPSORT flag),
* another use case is also possible, when by old_data argument selects a
* specific item from multi-value/duplicates with the same key for deletion or
* update. To select this scenario in flags should simultaneously specify
* \ref MDBX_CURRENT and \ref MDBX_NOOVERWRITE. This combination is chosen
* because it makes no sense, and thus allows you to identify the request of
* such a scenario.
*
* \param [in] txn           A transaction handle returned
*                           by \ref mdbx_txn_begin().
* \param [in] dbi           A database handle returned by \ref mdbx_dbi_open().
* \param [in] key           The key to store in the database.
* \param [in] new_data      The data to store, if NULL then deletion will
*                           be performed.
* \param [in,out] old_data  The buffer for retrieve previous value as describe
*                           above.
* \param [in] flags         Special options for this operation.
*                           This parameter must be set to 0 or by bitwise
*                           OR'ing together one or more of the values
*                           described in \ref mdbx_put() description above,
*                           and additionally
*                           (\ref MDBX_CURRENT | \ref MDBX_NOOVERWRITE)
*                           combination for selection particular item from
*                           multi-value/duplicates.
*
* \see \ref c_crud_hints "Quick reference for Insert/Update/Delete operations"
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_replace(MDBX_txn *txn, MDBX_dbi dbi, const MDBX_val *key,
MDBX_val *new_data, MDBX_val *old_data,
MDBX_put_flags_t flags); */
  // mdbx_replace: {
  //   parameters: ['pointer', 'u32', 'pointer', 'pointer', 'pointer', 'i32'],
  //   pointers: ['MDBX_txn *', 'MDBX_dbi', 'const MDBX_val *', 'MDBX_val *', 'MDBX_val *', 'MDBX_put_flags_t'],
  //   result: 'i32'
  // },
/** \brief Delete items from a database.
* \ingroup c_crud
*
* This function removes key/data pairs from the database.
*
* \note The data parameter is NOT ignored regardless the database does
* support sorted duplicate data items or not. If the data parameter
* is non-NULL only the matching data item will be deleted. Otherwise, if data
* parameter is NULL, any/all value(s) for specified key will be deleted.
*
* This function will return \ref MDBX_NOTFOUND if the specified key/data
* pair is not in the database.
*
* \see \ref c_crud_hints "Quick reference for Insert/Update/Delete operations"
*
* \param [in] txn   A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi   A database handle returned by \ref mdbx_dbi_open().
* \param [in] key   The key to delete from the database.
* \param [in] data  The data to delete.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_EACCES   An attempt was made to write
*                       in a read-only transaction.
* \retval MDBX_EINVAL   An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_del(MDBX_txn *txn, MDBX_dbi dbi, const MDBX_val *key,
const MDBX_val *data); */
  mdbx_del: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['MDBX_txn *', 'MDBX_dbi', 'const MDBX_val *', 'const MDBX_val *'],
    result: 'i32'
  },
/** \brief Create a cursor handle but not bind it to transaction nor DBI-handle.
* \ingroup c_cursors
*
* A cursor cannot be used when its database handle is closed. Nor when its
* transaction has ended, except with \ref mdbx_cursor_bind() and \ref
* mdbx_cursor_renew(). Also it can be discarded with \ref mdbx_cursor_close().
*
* A cursor must be closed explicitly always, before or after its transaction
* ends. It can be reused with \ref mdbx_cursor_bind()
* or \ref mdbx_cursor_renew() before finally closing it.
*
* \note In contrast to LMDB, the MDBX required that any opened cursors can be
* reused and must be freed explicitly, regardless ones was opened in a
* read-only or write transaction. The REASON for this is eliminates ambiguity
* which helps to avoid errors such as: use-after-free, double-free, i.e.
* memory corruption and segfaults.
*
* \param [in] context A pointer to application context to be associated with
*                     created cursor and could be retrieved by
*                     \ref mdbx_cursor_get_userctx() until cursor closed.
*
* \returns Created cursor handle or NULL in case out of memory. */
/* LIBMDBX_API MDBX_cursor *mdbx_cursor_create(void *context); */
  mdbx_cursor_create: {
    parameters: ['pointer'],
    pointers: ['void *'],
    result: 'pointer',
    rpointer: 'MDBX_cursor *'
  },
/** \brief Set application information associated with the cursor.
* \ingroup c_cursors
* \see mdbx_cursor_get_userctx()
*
* \param [in] cursor  An cursor handle returned by \ref mdbx_cursor_create()
*                     or \ref mdbx_cursor_open().
* \param [in] ctx     An arbitrary pointer for whatever the application needs.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_cursor_set_userctx(MDBX_cursor *cursor, void *ctx); */
  mdbx_cursor_set_userctx: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_cursor *', 'void *'],
    result: 'i32'
  },
/** \brief Bind cursor to specified transaction and DBI-handle.
* \ingroup c_cursors
*
* Using of the `mdbx_cursor_bind()` is equivalent to calling
* \ref mdbx_cursor_renew() but with specifying an arbitrary DBI-handle.
*
* A cursor may be associated with a new transaction, and referencing a new or
* the same database handle as it was created with. This may be done whether the
* previous transaction is live or dead.
*
* \note In contrast to LMDB, the MDBX required that any opened cursors can be
* reused and must be freed explicitly, regardless ones was opened in a
* read-only or write transaction. The REASON for this is eliminates ambiguity
* which helps to avoid errors such as: use-after-free, double-free, i.e.
* memory corruption and segfaults.
*
* \param [in] txn      A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi      A database handle returned by \ref mdbx_dbi_open().
* \param [in] cursor   A cursor handle returned by \ref mdbx_cursor_create().
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL  An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_bind(const MDBX_txn *txn, MDBX_cursor *cursor,
  MDBX_dbi dbi); */
  mdbx_cursor_bind: {
    parameters: ['pointer', 'pointer', 'u32'],
    pointers: ['const MDBX_txn *', 'MDBX_cursor *', 'MDBX_dbi'],
    result: 'i32'
  },
/** \brief Create a cursor handle for the specified transaction and DBI handle.
* \ingroup c_cursors
*
* Using of the `mdbx_cursor_open()` is equivalent to calling
* \ref mdbx_cursor_create() and then \ref mdbx_cursor_bind() functions.
*
* A cursor cannot be used when its database handle is closed. Nor when its
* transaction has ended, except with \ref mdbx_cursor_bind() and \ref
* mdbx_cursor_renew(). Also it can be discarded with \ref mdbx_cursor_close().
*
* A cursor must be closed explicitly always, before or after its transaction
* ends. It can be reused with \ref mdbx_cursor_bind()
* or \ref mdbx_cursor_renew() before finally closing it.
*
* \note In contrast to LMDB, the MDBX required that any opened cursors can be
* reused and must be freed explicitly, regardless ones was opened in a
* read-only or write transaction. The REASON for this is eliminates ambiguity
* which helps to avoid errors such as: use-after-free, double-free, i.e.
* memory corruption and segfaults.
*
* \param [in] txn      A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] dbi      A database handle returned by \ref mdbx_dbi_open().
* \param [out] cursor  Address where the new \ref MDBX_cursor handle will be
*                      stored.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL  An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_open(const MDBX_txn *txn, MDBX_dbi dbi,
  MDBX_cursor **cursor); */
  mdbx_cursor_open: {
    parameters: ['pointer', 'u32', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_dbi', 'MDBX_cursor **'],
    result: 'i32'
  },
/** \brief Close a cursor handle.
* \ingroup c_cursors
*
* The cursor handle will be freed and must not be used again after this call,
* but its transaction may still be live.
*
* \note In contrast to LMDB, the MDBX required that any opened cursors can be
* reused and must be freed explicitly, regardless ones was opened in a
* read-only or write transaction. The REASON for this is eliminates ambiguity
* which helps to avoid errors such as: use-after-free, double-free, i.e.
* memory corruption and segfaults.
*
* \param [in] cursor  A cursor handle returned by \ref mdbx_cursor_open()
*                     or \ref mdbx_cursor_create(). */
/* LIBMDBX_API void mdbx_cursor_close(MDBX_cursor *cursor); */
  mdbx_cursor_close: {
    parameters: ['pointer'],
    pointers: ['MDBX_cursor *'],
    result: 'void'
  },
/** \brief Renew a cursor handle for use within the given transaction.
* \ingroup c_cursors
*
* A cursor may be associated with a new transaction whether the previous
* transaction is running or finished.
*
* Using of the `mdbx_cursor_renew()` is equivalent to calling
* \ref mdbx_cursor_bind() with the DBI-handle that previously
* the cursor was used with.
*
* \note In contrast to LMDB, the MDBX allow any cursor to be re-used by using
* \ref mdbx_cursor_renew(), to avoid unnecessary malloc/free overhead until it
* freed by \ref mdbx_cursor_close().
*
* \param [in] txn      A transaction handle returned by \ref mdbx_txn_begin().
* \param [in] cursor   A cursor handle returned by \ref mdbx_cursor_open().
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL  An invalid parameter was specified.
* \retval MDBX_BAD_DBI The cursor was not bound to a DBI-handle
*                      or such a handle became invalid. */
/* LIBMDBX_API int mdbx_cursor_renew(const MDBX_txn *txn, MDBX_cursor *cursor); */
  mdbx_cursor_renew: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_txn *', 'MDBX_cursor *'],
    result: 'i32'
  },
/** \brief Return the cursor's database handle.
* \ingroup c_cursors
*
* \param [in] cursor  A cursor handle returned by \ref mdbx_cursor_open(). */
/* LIBMDBX_API MDBX_dbi mdbx_cursor_dbi(const MDBX_cursor *cursor); */
  mdbx_cursor_dbi: {
    parameters: ['pointer'],
    pointers: ['const MDBX_cursor *'],
    result: 'u32'
  },
/** \brief Copy cursor position and state.
* \ingroup c_cursors
*
* \param [in] src       A source cursor handle returned
* by \ref mdbx_cursor_create() or \ref mdbx_cursor_open().
*
* \param [in,out] dest  A destination cursor handle returned
* by \ref mdbx_cursor_create() or \ref mdbx_cursor_open().
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_cursor_copy(const MDBX_cursor *src, MDBX_cursor *dest); */
  mdbx_cursor_copy: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_cursor *', 'MDBX_cursor *'],
    result: 'i32'
  },
/** \brief Retrieve by cursor.
* \ingroup c_crud
*
* This function retrieves key/data pairs from the database. The address and
* length of the key are returned in the object to which key refers (except
* for the case of the \ref MDBX_SET option, in which the key object is
* unchanged), and the address and length of the data are returned in the object
* to which data refers.
* \see mdbx_get()
*
* \note The memory pointed to by the returned values is owned by the
* database. The caller MUST not dispose of the memory, and MUST not modify it
* in any way regardless in a read-only nor read-write transactions!
* For case a database opened without the \ref MDBX_WRITEMAP modification
* attempts likely will cause a `SIGSEGV`. However, when a database opened with
* the \ref MDBX_WRITEMAP or in case values returned inside read-write
* transaction are located on a "dirty" (modified and pending to commit) pages,
* such modification will silently accepted and likely will lead to DB and/or
* data corruption.
*
* \param [in] cursor    A cursor handle returned by \ref mdbx_cursor_open().
* \param [in,out] key   The key for a retrieved item.
* \param [in,out] data  The data of a retrieved item.
* \param [in] op        A cursor operation \ref MDBX_cursor_op.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_NOTFOUND  No matching key found.
* \retval MDBX_EINVAL    An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_get(MDBX_cursor *cursor, MDBX_val *key,
 MDBX_val *data, MDBX_cursor_op op); */
  // mdbx_cursor_get: {
  //   parameters: ['pointer', 'pointer', 'pointer', 'u32'],
  //   pointers: ['MDBX_cursor *', 'MDBX_val *', 'MDBX_val *', 'MDBX_cursor_op'],
  //   result: 'i32'
  // },
/** \brief Retrieve multiple non-dupsort key/value pairs by cursor.
* \ingroup c_crud
*
* This function retrieves multiple key/data pairs from the database without
* \ref MDBX_DUPSORT option. For `MDBX_DUPSORT` databases please
* use \ref MDBX_GET_MULTIPLE and \ref MDBX_NEXT_MULTIPLE.
*
* The number of key and value items is returned in the `size_t count`
* refers. The addresses and lengths of the keys and values are returned in the
* array to which `pairs` refers.
* \see mdbx_cursor_get()
*
* \note The memory pointed to by the returned values is owned by the
* database. The caller MUST not dispose of the memory, and MUST not modify it
* in any way regardless in a read-only nor read-write transactions!
* For case a database opened without the \ref MDBX_WRITEMAP modification
* attempts likely will cause a `SIGSEGV`. However, when a database opened with
* the \ref MDBX_WRITEMAP or in case values returned inside read-write
* transaction are located on a "dirty" (modified and pending to commit) pages,
* such modification will silently accepted and likely will lead to DB and/or
* data corruption.
*
* \param [in] cursor     A cursor handle returned by \ref mdbx_cursor_open().
* \param [out] count     The number of key and value item returned, on success
*                        it always be the even because the key-value
*                        pairs are returned.
* \param [in,out] pairs  A pointer to the array of key value pairs.
* \param [in] limit      The size of pairs buffer as the number of items,
*                        but not a pairs.
* \param [in] op         A cursor operation \ref MDBX_cursor_op (only
*                        \ref MDBX_FIRST, \ref MDBX_NEXT, \ref MDBX_GET_CURRENT
*                        are supported).
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_NOTFOUND         No more key-value pairs are available.
* \retval MDBX_ENODATA          The cursor is already at the end of data.
* \retval MDBX_RESULT_TRUE      The specified limit is less than the available
*                               key-value pairs on the current page/position
*                               that the cursor points to.
* \retval MDBX_EINVAL           An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_get_batch(MDBX_cursor *cursor, size_t *count,
       MDBX_val *pairs, size_t limit,
       MDBX_cursor_op op); */
  // mdbx_cursor_get_batch: {
  //   parameters: ['pointer', 'pointer', 'pointer', 'i32', 'u32'],
  //   pointers: ['MDBX_cursor *', 'size_t *', 'MDBX_val *', 'size_t', 'MDBX_cursor_op'],
  //   result: 'i32'
  // },
/** \brief Store by cursor.
* \ingroup c_crud
*
* This function stores key/data pairs into the database. The cursor is
* positioned at the new item, or on failure usually near it.
*
* \param [in] cursor    A cursor handle returned by \ref mdbx_cursor_open().
* \param [in] key       The key operated on.
* \param [in,out] data  The data operated on.
* \param [in] flags     Options for this operation. This parameter
*                       must be set to 0 or by bitwise OR'ing together
*                       one or more of the values described here:
*  - \ref MDBX_CURRENT
*      Replace the item at the current cursor position. The key parameter
*      must still be provided, and must match it, otherwise the function
*      return \ref MDBX_EKEYMISMATCH. With combination the
*      \ref MDBX_ALLDUPS will replace all multi-values.
*
*      \note MDBX allows (unlike LMDB) you to change the size of the data and
*      automatically handles reordering for sorted duplicates
*      (see \ref MDBX_DUPSORT).
*
*  - \ref MDBX_NODUPDATA
*      Enter the new key-value pair only if it does not already appear in the
*      database. This flag may only be specified if the database was opened
*      with \ref MDBX_DUPSORT. The function will return \ref MDBX_KEYEXIST
*      if the key/data pair already appears in the database.
*
*  - \ref MDBX_NOOVERWRITE
*      Enter the new key/data pair only if the key does not already appear
*      in the database. The function will return \ref MDBX_KEYEXIST if the key
*      already appears in the database, even if the database supports
*      duplicates (\ref MDBX_DUPSORT).
*
*  - \ref MDBX_RESERVE
*      Reserve space for data of the given size, but don't copy the given
*      data. Instead, return a pointer to the reserved space, which the
*      caller can fill in later - before the next update operation or the
*      transaction ends. This saves an extra memcpy if the data is being
*      generated later. This flag must not be specified if the database
*      was opened with \ref MDBX_DUPSORT.
*
*  - \ref MDBX_APPEND
*      Append the given key/data pair to the end of the database. No key
*      comparisons are performed. This option allows fast bulk loading when
*      keys are already known to be in the correct order. Loading unsorted
*      keys with this flag will cause a \ref MDBX_KEYEXIST error.
*
*  - \ref MDBX_APPENDDUP
*      As above, but for sorted dup data.
*
*  - \ref MDBX_MULTIPLE
*      Store multiple contiguous data elements in a single request. This flag
*      may only be specified if the database was opened with
*      \ref MDBX_DUPFIXED. With combination the \ref MDBX_ALLDUPS
*      will replace all multi-values.
*      The data argument must be an array of two \ref MDBX_val. The `iov_len`
*      of the first \ref MDBX_val must be the size of a single data element.
*      The `iov_base` of the first \ref MDBX_val must point to the beginning
*      of the array of contiguous data elements which must be properly aligned
*      in case of database with \ref MDBX_INTEGERDUP flag.
*      The `iov_len` of the second \ref MDBX_val must be the count of the
*      number of data elements to store. On return this field will be set to
*      the count of the number of elements actually written. The `iov_base` of
*      the second \ref MDBX_val is unused.
*
* \see \ref c_crud_hints "Quick reference for Insert/Update/Delete operations"
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EKEYMISMATCH  The given key value is mismatched to the current
*                            cursor position
* \retval MDBX_MAP_FULL      The database is full,
*                             see \ref mdbx_env_set_mapsize().
* \retval MDBX_TXN_FULL      The transaction has too many dirty pages.
* \retval MDBX_EACCES        An attempt was made to write in a read-only
*                            transaction.
* \retval MDBX_EINVAL        An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_put(MDBX_cursor *cursor, const MDBX_val *key,
 MDBX_val *data, MDBX_put_flags_t flags); */
  // mdbx_cursor_put: {
  //   parameters: ['pointer', 'pointer', 'pointer', 'i32'],
  //   pointers: ['MDBX_cursor *', 'const MDBX_val *', 'MDBX_val *', 'MDBX_put_flags_t'],
  //   result: 'i32'
  // },
/** \brief Delete current key/data pair.
* \ingroup c_crud
*
* This function deletes the key/data pair to which the cursor refers. This
* does not invalidate the cursor, so operations such as \ref MDBX_NEXT can
* still be used on it. Both \ref MDBX_NEXT and \ref MDBX_GET_CURRENT will
* return the same record after this operation.
*
* \param [in] cursor  A cursor handle returned by mdbx_cursor_open().
* \param [in] flags   Options for this operation. This parameter must be set
* to one of the values described here.
*
*  - \ref MDBX_CURRENT Delete only single entry at current cursor position.
*  - \ref MDBX_ALLDUPS
*    or \ref MDBX_NODUPDATA (supported for compatibility)
*      Delete all of the data items for the current key. This flag has effect
*      only for database(s) was created with \ref MDBX_DUPSORT.
*
* \see \ref c_crud_hints "Quick reference for Insert/Update/Delete operations"
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_MAP_FULL      The database is full,
*                            see \ref mdbx_env_set_mapsize().
* \retval MDBX_TXN_FULL      The transaction has too many dirty pages.
* \retval MDBX_EACCES        An attempt was made to write in a read-only
*                            transaction.
* \retval MDBX_EINVAL        An invalid parameter was specified. */
/* LIBMDBX_API int mdbx_cursor_del(MDBX_cursor *cursor, MDBX_put_flags_t flags); */
  // mdbx_cursor_del: {
  //   parameters: ['pointer', 'i32'],
  //   pointers: ['MDBX_cursor *', 'MDBX_put_flags_t'],
  //   result: 'i32'
  // },
/** \brief Return count of duplicates for current key.
* \ingroup c_crud
*
* This call is valid for all databases, but reasonable only for that support
* sorted duplicate data items \ref MDBX_DUPSORT.
*
* \param [in] cursor    A cursor handle returned by \ref mdbx_cursor_open().
* \param [out] pcount   Address where the count will be stored.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_THREAD_MISMATCH  Given transaction is not owned
*                               by current thread.
* \retval MDBX_EINVAL   Cursor is not initialized, or an invalid parameter
*                       was specified. */
/* LIBMDBX_API int mdbx_cursor_count(const MDBX_cursor *cursor, size_t *pcount); */
  mdbx_cursor_count: {
    parameters: ['pointer', 'pointer'],
    pointers: ['const MDBX_cursor *', 'size_t *'],
    result: 'i32'
  },
/** \brief Estimates the distance between cursors as a number of elements.
* \ingroup c_rqest
*
* This function performs a rough estimate based only on b-tree pages that are
* common for the both cursor's stacks. The results of such estimation can be
* used to build and/or optimize query execution plans.
*
* Please see notes on accuracy of the result in the details
* of \ref c_rqest section.
*
* Both cursors must be initialized for the same database and the same
* transaction.
*
* \param [in] first            The first cursor for estimation.
* \param [in] last             The second cursor for estimation.
* \param [out] distance_items  The pointer to store estimated distance value,
*                              i.e. `*distance_items = distance(first, last)`.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_estimate_distance(const MDBX_cursor *first,
        const MDBX_cursor *last,
        ptrdiff_t *distance_items); */
  mdbx_estimate_distance: {
    parameters: ['pointer', 'pointer', 'pointer'],
    pointers: ['const MDBX_cursor *', 'const MDBX_cursor *', 'ptrdiff_t *'],
    result: 'i32'
  },
/** \brief Estimates the move distance.
* \ingroup c_rqest
*
* This function performs a rough estimate distance between the current
* cursor position and next position after the specified move-operation with
* given key and data. The results of such estimation can be used to build
* and/or optimize query execution plans. Current cursor position and state are
* preserved.
*
* Please see notes on accuracy of the result in the details
* of \ref c_rqest section.
*
* \param [in] cursor            Cursor for estimation.
* \param [in,out] key           The key for a retrieved item.
* \param [in,out] data          The data of a retrieved item.
* \param [in] move_op           A cursor operation \ref MDBX_cursor_op.
* \param [out] distance_items   A pointer to store estimated move distance
*                               as the number of elements.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_estimate_move(const MDBX_cursor *cursor, MDBX_val *key,
    MDBX_val *data, MDBX_cursor_op move_op,
    ptrdiff_t *distance_items); */
  // mdbx_estimate_move: {
  //   parameters: ['pointer', 'pointer', 'pointer', 'u32', 'pointer'],
  //   pointers: ['const MDBX_cursor *', 'MDBX_val *', 'MDBX_val *', 'MDBX_cursor_op', 'ptrdiff_t *'],
  //   result: 'i32'
  // },
/** \brief Estimates the size of a range as a number of elements.
* \ingroup c_rqest
*
* The results of such estimation can be used to build and/or optimize query
* execution plans.
*
* Please see notes on accuracy of the result in the details
* of \ref c_rqest section.
*
*
* \param [in] txn        A transaction handle returned
*                        by \ref mdbx_txn_begin().
* \param [in] dbi        A database handle returned by  \ref mdbx_dbi_open().
* \param [in] begin_key  The key of range beginning or NULL for explicit FIRST.
* \param [in] begin_data Optional additional data to seeking among sorted
*                        duplicates.
*                        Only for \ref MDBX_DUPSORT, NULL otherwise.
* \param [in] end_key    The key of range ending or NULL for explicit LAST.
* \param [in] end_data   Optional additional data to seeking among sorted
*                        duplicates.
*                        Only for \ref MDBX_DUPSORT, NULL otherwise.
* \param [out] distance_items  A pointer to store range estimation result.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_estimate_range(const MDBX_txn *txn, MDBX_dbi dbi,
     const MDBX_val *begin_key,
     const MDBX_val *begin_data,
     const MDBX_val *end_key,
     const MDBX_val *end_data,
     ptrdiff_t *distance_items); */
  mdbx_estimate_range: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer'],
    pointers: [
      'const MDBX_txn *',
      'MDBX_dbi',
      'const MDBX_val *',
      'const MDBX_val *',
      'const MDBX_val *',
      'const MDBX_val *',
      'ptrdiff_t *',
    ],
    result: 'i32'
  },
/** \brief Sequence generation for a database.
* \ingroup c_crud
*
* The function allows to create a linear sequence of unique positive integers
* for each database. The function can be called for a read transaction to
* retrieve the current sequence value, and the increment must be zero.
* Sequence changes become visible outside the current write transaction after
* it is committed, and discarded on abort.
*
* \param [in] txn        A transaction handle returned
*                        by \ref mdbx_txn_begin().
* \param [in] dbi        A database handle returned by \ref mdbx_dbi_open().
* \param [out] result    The optional address where the value of sequence
*                        before the change will be stored.
* \param [in] increment  Value to increase the sequence,
*                        must be 0 for read-only transactions.
*
* \returns A non-zero error value on failure and 0 on success,
*          some possible errors are:
* \retval MDBX_RESULT_TRUE   Increasing the sequence has resulted in an
*                            overflow and therefore cannot be executed. */
/* LIBMDBX_API int mdbx_dbi_sequence(MDBX_txn *txn, MDBX_dbi dbi, uint64_t *result,
   uint64_t increment); */
  mdbx_dbi_sequence: {
    parameters: ['pointer', 'u32', 'pointer', 'pointer'],
    pointers: ['MDBX_txn *', 'MDBX_dbi', 'uint64_t *', 'uint64_t'],
    result: 'i32'
  },
/** \brief Enumerate the entries in the reader lock table.
*
* \ingroup c_statinfo
*
* \param [in] env     An environment handle returned by \ref mdbx_env_create().
* \param [in] func    A \ref MDBX_reader_list_func function.
* \param [in] ctx     An arbitrary context pointer for the enumeration
*                     function.
*
* \returns A non-zero error value on failure and 0 on success,
* or \ref MDBX_RESULT_TRUE if the reader lock table is empty. */
/* LIBMDBX_API int mdbx_reader_list(const MDBX_env *env,
  MDBX_reader_list_func *func, void *ctx); */
  mdbx_reader_list: {
    parameters: ['pointer', 'pointer', 'pointer'],
    pointers: ['const MDBX_env *', 'MDBX_reader_list_func *', 'void *'],
    result: 'i32'
  },
/** \brief Check for stale entries in the reader lock table.
* \ingroup c_extra
*
* \param [in] env     An environment handle returned by \ref mdbx_env_create().
* \param [out] dead   Number of stale slots that were cleared.
*
* \returns A non-zero error value on failure and 0 on success,
* or \ref MDBX_RESULT_TRUE if a dead reader(s) found or mutex was recovered. */
/* LIBMDBX_API int mdbx_reader_check(MDBX_env *env, int *dead); */
  mdbx_reader_check: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_env *', 'int *'],
    result: 'i32'
  },
/** \brief Registers the current thread as a reader for the environment.
* \ingroup c_extra
*
* To perform read operations without blocking, a reader slot must be assigned
* for each thread. However, this assignment requires a short-term lock
* acquisition which is performed automatically. This function allows you to
* assign the reader slot in advance and thus avoid capturing the blocker when
* the read transaction starts firstly from current thread.
* \see mdbx_thread_unregister()
*
* \note Threads are registered automatically the first time a read transaction
*       starts. Therefore, there is no need to use this function, except in
*       special cases.
*
* \param [in] env   An environment handle returned by \ref mdbx_env_create().
*
* \returns A non-zero error value on failure and 0 on success,
* or \ref MDBX_RESULT_TRUE if thread is already registered. */
/* LIBMDBX_API int mdbx_thread_register(const MDBX_env *env); */
  mdbx_thread_register: {
    parameters: ['pointer'],
    pointers: ['const MDBX_env *'],
    result: 'i32'
  },
/** \brief Unregisters the current thread as a reader for the environment.
* \ingroup c_extra
*
* To perform read operations without blocking, a reader slot must be assigned
* for each thread. However, the assigned reader slot will remain occupied until
* the thread ends or the environment closes. This function allows you to
* explicitly release the assigned reader slot.
* \see mdbx_thread_register()
*
* \param [in] env   An environment handle returned by \ref mdbx_env_create().
*
* \returns A non-zero error value on failure and 0 on success, or
* \ref MDBX_RESULT_TRUE if thread is not registered or already unregistered. */
/* LIBMDBX_API int mdbx_thread_unregister(const MDBX_env *env); */
  mdbx_thread_unregister: {
    parameters: ['pointer'],
    pointers: ['const MDBX_env *'],
    result: 'i32'
  },
/** \brief Sets a Handle-Slow-Readers callback to resolve database full/overflow
* issue due to a reader(s) which prevents the old data from being recycled.
* \ingroup c_err
*
* The callback will only be triggered when the database is full due to a
* reader(s) prevents the old data from being recycled.
*
* \see MDBX_hsr_func
* \see mdbx_env_get_hsr()
* \see <a href="intro.html#long-lived-read">Long-lived read transactions</a>
*
* \param [in] env             An environment handle returned
*                             by \ref mdbx_env_create().
* \param [in] hsr_callback    A \ref MDBX_hsr_func function
*                             or NULL to disable.
*
* \returns A non-zero error value on failure and 0 on success. */
/* LIBMDBX_API int mdbx_env_set_hsr(MDBX_env *env, MDBX_hsr_func *hsr_callback); */
  mdbx_env_set_hsr: {
    parameters: ['pointer', 'pointer'],
    pointers: ['MDBX_env *', 'MDBX_hsr_func *'],
    result: 'i32'
  },
/** \brief Open an environment instance using specific meta-page
* for checking and recovery.
*
* This function mostly of internal API for `mdbx_chk` utility and subject to
* change at any time. Do not use this function to avoid shooting your own
* leg(s).
*
* \note On Windows the \ref mdbx_env_open_for_recoveryW() is recommended
* to use. */
/* LIBMDBX_API int mdbx_env_open_for_recovery(MDBX_env *env, const char *pathname,
            unsigned target_meta,
            bool writeable); */
  mdbx_env_open_for_recovery: {
    parameters: ['pointer', 'pointer', 'u32', 'bool'],
    pointers: ['MDBX_env *', 'const char *', 'unsigned',],
    result: 'i32'
  },
/** \brief Turn database to the specified meta-page.
*
* This function mostly of internal API for `mdbx_chk` utility and subject to
* change at any time. Do not use this function to avoid shooting your own
* leg(s). */
// LIBMDBX_API int mdbx_env_turn_for_recovery(MDBX_env *env, unsigned target_meta);
  mdbx_env_turn_for_recovery: {
    parameters: ['pointer', 'u32'],
    pointers: ['MDBX_env *', 'unsigned'],
    result: 'i32'
  },
/** \brief Returns the maximum size of keys can put.
 * \ingroup c_statinfo
 *
 * \param [in] env    An environment handle returned by \ref mdbx_env_create().
 * \param [in] flags  Database options (\ref MDBX_DUPSORT, \ref MDBX_INTEGERKEY
 *                    and so on). \see db_flags
 *
 * \returns The maximum size of a key can write,
 *          or -1 if something is wrong. */
// MDBX_NOTHROW_PURE_FUNCTION LIBMDBX_API int
// mdbx_env_get_maxkeysize_ex(const MDBX_env *env, MDBX_db_flags_t flags);
  mdbx_env_get_maxkeysize_ex0: {
    parameters: ['pointer', 'u32'],
    pointers: ['const MDBX_env *', ],
    result: 'i32',
    name: 'ef_mdbx_env_get_maxkeysize_ex'
  },
})

const includes = ['mdbx.h']
const name = 'libmdbx'
const preamble = `
  int ef_mdbx_env_open(MDBX_env *env, const char *pathname,
                              uint32_t flags, mdbx_mode_t mode) {
    /* !!! use only MDBX_env_flags_t constants for flags !!! */
    MDBX_env_flags_t f = static_cast< MDBX_env_flags_t >( flags );
    return mdbx_env_open(env, pathname, f, mode);
  }
    int ef_mdbx_txn_begin_ex(MDBX_env *env, uint32_t flags, MDBX_txn **txn, void *context) {
    /* !!! use only MDBX_txn_flags_t constants for flags !!! */
    MDBX_txn_flags_t f = static_cast< MDBX_txn_flags_t >( flags );
    return mdbx_txn_begin_ex(env, NULL, f, txn, context);
  }
  int ef_mdbx_txn_begin_ex(MDBX_env *env, MDBX_txn *parent,
          uint32_t flags, MDBX_txn **txn, void *context) {
    /* !!! use only MDBX_txn_flags_t constants for flags !!! */
    MDBX_txn_flags_t f = static_cast< MDBX_txn_flags_t >( flags );
    return mdbx_txn_begin_ex(env, parent, f, txn, context);
  }
  int ef_mdbx_put(MDBX_txn *txn, MDBX_dbi dbi, const MDBX_val *key,
                MDBX_val *data, uint32_t flags) {
    /* !!! use only MDBX_put_flags_t constants for flags !!! */
    MDBX_put_flags_t f = static_cast< MDBX_put_flags_t >( flags );
    return mdbx_put(txn, dbi, key, data, f);
  }
  int ef_mdbx_env_get_maxkeysize_ex(const MDBX_env *env, uint32_t flags) {
    /* !!! use only MDBX_db_flags_t constants for flags !!! */
    MDBX_db_flags_t f = static_cast< MDBX_db_flags_t >( flags );
    return mdbx_env_get_maxkeysize_ex(env, f);
  }
  int ef_mdbx_dbi_open(MDBX_txn *txn, const char *name,
            uint32_t flags, MDBX_dbi *dbi) {
    /* !!! use only MDBX_db_flags_t constants for flags !!! */
    MDBX_db_flags_t f = static_cast< MDBX_db_flags_t >( flags );
    return mdbx_dbi_open(txn, name, f, dbi);
  }
  int ef_mdbx_dbi_open(MDBX_txn *txn, uint32_t flags, MDBX_dbi *dbi) {
    /* !!! use only MDBX_db_flags_t constants for flags !!! */
    MDBX_db_flags_t f = static_cast< MDBX_db_flags_t >( flags );
    return mdbx_dbi_open(txn, NULL, f, dbi);
  }
  int fixed_intptr_t_mdbx_env_set_geometry(MDBX_env *env, void *settings) {
    intptr_t (*s)[6] = (intptr_t (*)[6]) settings;
    intptr_t size_lower = (*s)[0];
    intptr_t size_now = (*s)[1];
    intptr_t size_upper = (*s)[2];
    intptr_t growth_step = (*s)[3];
    intptr_t shrink_threshold = (*s)[4];
    intptr_t pagesize = (*s)[5];
    return mdbx_env_set_geometry(env, size_lower, size_now, size_upper,
          growth_step, shrink_threshold, pagesize);
  }
`

const libs = []
const obj = ['deps/libmdbx.a']

/** @type {LibConstsTypedFn} */
const constants_typed = (v) => v;

const constants = constants_typed({
  // MDBX_db_flags_t
  MDBX_DB_DEFAULTS: 'u32',
  MDBX_REVERSEKEY: 'u32',
  MDBX_DUPSORT: 'u32',
  MDBX_INTEGERKEY: 'u32',
  MDBX_DUPFIXED: 'u32',
  MDBX_INTEGERDUP: 'u32',
  MDBX_REVERSEDUP: 'u32',
  MDBX_CREATE: 'u32',
  MDBX_DB_ACCEDE: 'u32',

  // MDBX_put_flags_t
  MDBX_UPSERT: 'u32',
  MDBX_NOOVERWRITE: 'u32',
  MDBX_NODUPDATA: 'u32',
  MDBX_CURRENT: 'u32',
  MDBX_ALLDUPS: 'u32',
  MDBX_RESERVE: 'u32',
  MDBX_APPEND: 'u32',
  MDBX_APPENDDUP: 'u32',
  MDBX_MULTIPLE: 'u32',

/** \brief Environment copy flags
 * \ingroup c_extra
 * \see mdbx_env_copy() \see mdbx_env_copy2fd() */
// enum MDBX_copy_flags_t {
  MDBX_CP_DEFAULTS: 'i32',

  /** Copy with compactification: Omit free space from copy and renumber all
   * pages sequentially */
  MDBX_CP_COMPACT: 'i32',

  /** Force to make resizable copy, i.e. dynamic size instead of fixed */
  MDBX_CP_FORCE_DYNAMIC_SIZE: 'i32',
// };


/** \brief Cursor operations
 * \ingroup c_cursors
 * This is the set of all operations for retrieving data using a cursor.
 * \see mdbx_cursor_get() */
// enum MDBX_cursor_op {
  /** Position at first key/data item */
  MDBX_FIRST: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at first data item of current key. */
  MDBX_FIRST_DUP: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at key/data pair. */
  MDBX_GET_BOTH: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at given key and at first data greater
   * than or equal to specified data. */
  MDBX_GET_BOTH_RANGE: 'i32',

  /** Return key/data at current cursor position */
  MDBX_GET_CURRENT: 'i32',

  /** \ref MDBX_DUPFIXED -only: Return up to a page of duplicate data items
   * from current cursor position. Move cursor to prepare
   * for \ref MDBX_NEXT_MULTIPLE. */
  MDBX_GET_MULTIPLE: 'i32',

  /** Position at last key/data item */
  MDBX_LAST: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at last data item of current key. */
  MDBX_LAST_DUP: 'i32',

  /** Position at next data item */
  MDBX_NEXT: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at next data item of current key. */
  MDBX_NEXT_DUP: 'i32',

  /** \ref MDBX_DUPFIXED -only: Return up to a page of duplicate data items
   * from next cursor position. Move cursor to prepare
   * for `MDBX_NEXT_MULTIPLE`. */
  MDBX_NEXT_MULTIPLE: 'i32',

  /** Position at first data item of next key */
  MDBX_NEXT_NODUP: 'i32',

  /** Position at previous data item */
  MDBX_PREV: 'i32',

  /** \ref MDBX_DUPSORT -only: Position at previous data item of current key. */
  MDBX_PREV_DUP: 'i32',

  /** Position at last data item of previous key */
  MDBX_PREV_NODUP: 'i32',

  /** Position at specified key */
  MDBX_SET: 'i32',

  /** Position at specified key, return both key and data */
  MDBX_SET_KEY: 'i32',

  /** Position at first key greater than or equal to specified key. */
  MDBX_SET_RANGE: 'i32',

  /** \ref MDBX_DUPFIXED -only: Position at previous page and return up to
   * a page of duplicate data items. */
  MDBX_PREV_MULTIPLE: 'i32',

  /** Positions cursor at first key-value pair greater than or equal to
   * specified, return both key and data, and the return code depends on whether
   * a exact match.
   *
   * For non DUPSORT-ed collections this work the same to \ref MDBX_SET_RANGE,
   * but returns \ref MDBX_SUCCESS if key found exactly or
   * \ref MDBX_RESULT_TRUE if greater key was found.
   *
   * For DUPSORT-ed a data value is taken into account for duplicates,
   * i.e. for a pairs/tuples of a key and an each data value of duplicates.
   * Returns \ref MDBX_SUCCESS if key-value pair found exactly or
   * \ref MDBX_RESULT_TRUE if the next pair was returned. */
  MDBX_SET_LOWERBOUND: 'i32',

  /** Positions cursor at first key-value pair greater than specified,
   * return both key and data, and the return code depends on whether a
   * upper-bound was found.
   *
   * For non DUPSORT-ed collections this work the same to \ref MDBX_SET_RANGE,
   * but returns \ref MDBX_SUCCESS if the greater key was found or
   * \ref MDBX_NOTFOUND otherwise.
   *
   * For DUPSORT-ed a data value is taken into account for duplicates,
   * i.e. for a pairs/tuples of a key and an each data value of duplicates.
   * Returns \ref MDBX_SUCCESS if the greater pair was returned or
   * \ref MDBX_NOTFOUND otherwise. */
  MDBX_SET_UPPERBOUND: 'i32',
// };

  // MDBX_error_t
  MDBX_SUCCESS: 'i32',
  MDBX_RESULT_FALSE: 'i32',
  MDBX_RESULT_TRUE: 'i32',
  MDBX_KEYEXIST: 'i32',
  MDBX_FIRST_LMDB_ERRCODE: 'i32',
  MDBX_NOTFOUND: 'i32',
  MDBX_PAGE_NOTFOUND: 'i32',
  MDBX_CORRUPTED: 'i32',
  MDBX_PANIC: 'i32',
  MDBX_VERSION_MISMATCH: 'i32',
  MDBX_INVALID: 'i32',
  MDBX_MAP_FULL: 'i32',
  MDBX_DBS_FULL: 'i32',
  MDBX_READERS_FULL: 'i32',
  MDBX_TXN_FULL: 'i32',
  MDBX_CURSOR_FULL: 'i32',
  MDBX_PAGE_FULL: 'i32',
  MDBX_UNABLE_EXTEND_MAPSIZE: 'i32',
  MDBX_INCOMPATIBLE: 'i32',
  MDBX_BAD_RSLOT: 'i32',
  MDBX_BAD_TXN: 'i32',
  MDBX_BAD_VALSIZE: 'i32',
  MDBX_BAD_DBI: 'i32',
  MDBX_PROBLEM: 'i32',
  MDBX_LAST_LMDB_ERRCODE: 'i32',
  MDBX_BUSY: 'i32',
  MDBX_FIRST_ADDED_ERRCODE: 'i32',
  MDBX_EMULTIVAL: 'i32',
  MDBX_EBADSIGN: 'i32',
  MDBX_WANNA_RECOVERY: 'i32',
  MDBX_EKEYMISMATCH: 'i32',
  MDBX_TOO_LARGE: 'i32',
  MDBX_THREAD_MISMATCH: 'i32',
  MDBX_TXN_OVERLAPPING: 'i32',
  MDBX_BACKLOG_DEPLETED: 'i32',
  MDBX_DUPLICATED_CLK: 'i32',
  MDBX_LAST_ADDED_ERRCODE: 'i32',
  MDBX_ENODATA: 'i32',
  MDBX_EINVAL: 'i32',
  MDBX_EACCESS: 'i32',
  MDBX_ENOMEM: 'i32',
  MDBX_EROFS: 'i32',
  MDBX_ENOSYS: 'i32',
  MDBX_EIO: 'i32',
  MDBX_EPERM: 'i32',
  MDBX_EINTR: 'i32',
  MDBX_ENOFILE: 'i32',
  MDBX_EREMOTE: 'i32',

  //  MDBX_constants
  MDBX_MAX_DBI: 'u32',
  MDBX_MAXDATASIZE: 'u32',
  MDBX_MIN_PAGESIZE: 'u32',
  MDBX_MAX_PAGESIZE: 'u32',

  // MDBX_txn_flags_t
  MDBX_TXN_READWRITE: 'u32',
  MDBX_TXN_RDONLY: 'u32',
  MDBX_TXN_RDONLY_PREPARE: 'u32',
  MDBX_TXN_TRY: 'u32',
  MDBX_TXN_NOMETASYNC: 'u32',
  MDBX_TXN_NOSYNC: 'u32',
  MDBX_TXN_INVALID: 'u32',
  MDBX_TXN_FINISHED: 'u32',
  MDBX_TXN_ERROR: 'u32',
  MDBX_TXN_DIRTY: 'u32',
  MDBX_TXN_SPILLS: 'u32',
  MDBX_TXN_HAS_CHILD: 'u32',
  MDBX_TXN_BLOCKED: 'u32',

  // MDBX_env_flags_t
  MDBX_ENV_DEFAULTS: 'u32',
  MDBX_VALIDATION: 'u32',
  MDBX_NOSUBDIR: 'u32',
  MDBX_RDONLY: 'u32',
  MDBX_EXCLUSIVE: 'u32',
  MDBX_ACCEDE: 'u32',
  MDBX_WRITEMAP: 'u32',
  MDBX_NOTLS: 'u32',
  MDBX_NORDAHEAD: 'u32',
  MDBX_COALESCE: 'u32',
  MDBX_LIFORECLAIM: 'u32',
  MDBX_PAGEPERTURB: 'u32',
  MDBX_SYNC_DURABLE: 'u32',
  MDBX_NOMETASYNC: 'u32',
  MDBX_SAFE_NOSYNC: 'u32',
  MDBX_MAPASYNC: 'u32',
  MDBX_UTTERLY_NOSYNC: 'u32',
  MDBX_NOMEMINIT: 'u32',
// };
})

const structs = /**@type {const}*/([
  /** \brief Statistics for a database in the environment
 * \ingroup c_statinfo
 * \see mdbx_env_stat_ex() \see mdbx_dbi_stat() */
// struct MDBX_stat {
//   uint32_t ms_psize; /**< Size of a database page. This is the same for all
//                         databases. */
//   uint32_t ms_depth; /**< Depth (height) of the B-tree */
//   uint64_t ms_branch_pages;   /**< Number of internal (non-leaf) pages */
//   uint64_t ms_leaf_pages;     /**< Number of leaf pages */
//   uint64_t ms_overflow_pages; /**< Number of overflow pages */
//   uint64_t ms_entries;        /**< Number of data items */
//   uint64_t ms_mod_txnid; /**< Transaction ID of committed last modification */
// };
  'MDBX_stat',
  /** \brief Generic structure used for passing keys and data in and out of the
 * database.
 * \anchor MDBX_val \see mdbx::slice \see mdbx::buffer
 *
 * \details Values returned from the database are valid only until a subsequent
 * update operation, or the end of the transaction. Do not modify or
 * free them, they commonly point into the database itself.
 *
 * Key sizes must be between 0 and \ref mdbx_env_get_maxkeysize() inclusive.
 * The same applies to data sizes in databases with the \ref MDBX_DUPSORT flag.
 * Other data items can in theory be from 0 to \ref MDBX_MAXDATASIZE bytes long.
 *
 * \note The notable difference between MDBX and LMDB is that MDBX support zero
 * length keys. */
  // #ifndef HAVE_STRUCT_IOVEC
  // struct iovec {
  //   void *iov_base; /**< pointer to some data */
  //   size_t iov_len; /**< the length of data in bytes */
  // };
  // #define HAVE_STRUCT_IOVEC
  // #endif /* HAVE_STRUCT_IOVEC */

  // #if defined(__sun) || defined(__SVR4) || defined(__svr4__)
  // /* The `iov_len` is signed on Sun/Solaris.
  // * So define custom MDBX_val to avoid a lot of warnings. */
  // struct MDBX_val {
  //   void *iov_base; /**< pointer to some data */
  //   size_t iov_len; /**< the length of data in bytes */
  // };
  // #ifndef __cplusplus
  // typedef struct MDBX_val MDBX_val;
  // #endif
  // #else  /* SunOS */
  // typedef struct iovec MDBX_val;
  // #endif /* ! SunOS */
  'MDBX_val',
  /** \brief Statistics for a database in the environment
 * \ingroup c_statinfo
 * \see mdbx_env_stat_ex() \see mdbx_dbi_stat() */
  // struct MDBX_stat {
  //   uint32_t ms_psize; /**< Size of a database page. This is the same for all
  //                         databases. */
  //   uint32_t ms_depth; /**< Depth (height) of the B-tree */
  //   uint64_t ms_branch_pages;   /**< Number of internal (non-leaf) pages */
  //   uint64_t ms_leaf_pages;     /**< Number of leaf pages */
  //   uint64_t ms_overflow_pages; /**< Number of overflow pages */
  //   uint64_t ms_entries;        /**< Number of data items */
  //   uint64_t ms_mod_txnid; /**< Transaction ID of committed last modification */
  // };
  // #ifndef __cplusplus
  // /** \ingroup c_statinfo */
  // typedef struct MDBX_stat MDBX_stat;
  // #endif
  // 'MDBX_stat', // errors out
  /** \brief Information about the environment
 * \ingroup c_statinfo
 * \see mdbx_env_info_ex() */
  // struct MDBX_envinfo {
  //   struct {
  //     uint64_t lower;   /**< Lower limit for datafile size */
  //     uint64_t upper;   /**< Upper limit for datafile size */
  //     uint64_t current; /**< Current datafile size */
  //     uint64_t shrink;  /**< Shrink threshold for datafile */
  //     uint64_t grow;    /**< Growth step for datafile */
  //   } mi_geo;
  //   uint64_t mi_mapsize;             /**< Size of the data memory map */
  //   uint64_t mi_last_pgno;           /**< Number of the last used page */
  //   uint64_t mi_recent_txnid;        /**< ID of the last committed transaction */
  //   uint64_t mi_latter_reader_txnid; /**< ID of the last reader transaction */
  //   uint64_t mi_self_latter_reader_txnid; /**< ID of the last reader transaction
  //                                           of caller process */
  //   uint64_t mi_meta0_txnid, mi_meta0_sign;
  //   uint64_t mi_meta1_txnid, mi_meta1_sign;
  //   uint64_t mi_meta2_txnid, mi_meta2_sign;
  //   uint32_t mi_maxreaders;   /**< Total reader slots in the environment */
  //   uint32_t mi_numreaders;   /**< Max reader slots used in the environment */
  //   uint32_t mi_dxb_pagesize; /**< Database pagesize */
  //   uint32_t mi_sys_pagesize; /**< System pagesize */

  //   /** \brief A mostly unique ID that is regenerated on each boot.

  //   As such it can be used to identify the local machine's current boot. MDBX
  //   uses such when open the database to determine whether rollback required to
  //   the last steady sync point or not. I.e. if current bootid is differ from the
  //   value within a database then the system was rebooted and all changes since
  //   last steady sync must be reverted for data integrity. Zeros mean that no
  //   relevant information is available from the system. */
  //   struct {
  //     struct {
  //       uint64_t x, y;
  //     } current, meta0, meta1, meta2;
  //   } mi_bootid;

  //   /** Bytes not explicitly synchronized to disk */
  //   uint64_t mi_unsync_volume;
  //   /** Current auto-sync threshold, see \ref mdbx_env_set_syncbytes(). */
  //   uint64_t mi_autosync_threshold;
  //   /** Time since entering to a "dirty" out-of-sync state in units of 1/65536 of
  //    * second. In other words, this is the time since the last non-steady commit
  //    * or zero if it was steady. */
  //   uint32_t mi_since_sync_seconds16dot16;
  //   /** Current auto-sync period in 1/65536 of second,
  //    * see \ref mdbx_env_set_syncperiod(). */
  //   uint32_t mi_autosync_period_seconds16dot16;
  //   /** Time since the last readers check in 1/65536 of second,
  //    * see \ref mdbx_reader_check(). */
  //   uint32_t mi_since_reader_check_seconds16dot16;
  //   /** Current environment mode.
  //    * The same as \ref mdbx_env_get_flags() returns. */
  //   uint32_t mi_mode;

  //   /** Statistics of page operations.
  //    * \details Overall statistics of page operations of all (running, completed
  //    * and aborted) transactions in the current multi-process session (since the
  //    * first process opened the database after everyone had previously closed it).
  //    */
  //   struct {
  //     uint64_t newly;    /**< Quantity of a new pages added */
  //     uint64_t cow;      /**< Quantity of pages copied for update */
  //     uint64_t clone;    /**< Quantity of parent's dirty pages clones
  //                             for nested transactions */
  //     uint64_t split;    /**< Page splits */
  //     uint64_t merge;    /**< Page merges */
  //     uint64_t spill;    /**< Quantity of spilled dirty pages */
  //     uint64_t unspill;  /**< Quantity of unspilled/reloaded pages */
  //     uint64_t wops;     /**< Number of explicit write operations (not a pages)
  //                             to a disk */
  //     uint64_t prefault; /**< Number of prefault write operations (not a pages) */
  //     uint64_t mincore;  /**< Number of mincore() calls */
  //     uint64_t
  //         msync; /**< Number of explicit msync-to-disk operations (not a pages) */
  //     uint64_t
  //         fsync; /**< Number of explicit fsync-to-disk operations (not a pages) */
  //   } mi_pgop_stat;
  // };
  // #ifndef __cplusplus
  // /** \ingroup c_statinfo */
  // typedef struct MDBX_envinfo MDBX_envinfo;
  // #endif
  'MDBX_envinfo',
  /** \brief Information about the transaction
 * \ingroup c_statinfo
 * \see mdbx_txn_info */
  // struct MDBX_txn_info {
  //   /** The ID of the transaction. For a READ-ONLY transaction, this corresponds
  //       to the snapshot being read. */
  //   uint64_t txn_id;

  //   /** For READ-ONLY transaction: the lag from a recent MVCC-snapshot, i.e. the
  //      number of committed transaction since read transaction started.
  //     For WRITE transaction (provided if `scan_rlt=true`): the lag of the oldest
  //     reader from current transaction (i.e. at least 1 if any reader running). */
  //   uint64_t txn_reader_lag;

  //   /** Used space by this transaction, i.e. corresponding to the last used
  //    * database page. */
  //   uint64_t txn_space_used;

  //   /** Current size of database file. */
  //   uint64_t txn_space_limit_soft;

  //   /** Upper bound for size the database file, i.e. the value `size_upper`
  //      argument of the appropriate call of \ref mdbx_env_set_geometry(). */
  //   uint64_t txn_space_limit_hard;

  //   /** For READ-ONLY transaction: The total size of the database pages that were
  //      retired by committed write transactions after the reader's MVCC-snapshot,
  //     i.e. the space which would be freed after the Reader releases the
  //     MVCC-snapshot for reuse by completion read transaction.
  //     For WRITE transaction: The summarized size of the database pages that were
  //     retired for now due Copy-On-Write during this transaction. */
  //   uint64_t txn_space_retired;

  //   /** For READ-ONLY transaction: the space available for writer(s) and that
  //      must be exhausted for reason to call the Handle-Slow-Readers callback for
  //     this read transaction.
  //     For WRITE transaction: the space inside transaction
  //     that left to `MDBX_TXN_FULL` error. */
  //   uint64_t txn_space_leftover;

  //   /** For READ-ONLY transaction (provided if `scan_rlt=true`): The space that
  //      actually become available for reuse when only this transaction will be
  //     finished.
  //     For WRITE transaction: The summarized size of the dirty database
  //     pages that generated during this transaction. */
  //   uint64_t txn_space_dirty;
  // };
  // #ifndef __cplusplus
  // /** \ingroup c_statinfo */
  // typedef struct MDBX_txn_info MDBX_txn_info;
  // #endif
  'MDBX_txn_info',
  /** \brief Latency of commit stages in 1/65536 of seconds units.
 * \warning This structure may be changed in future releases.
 * \ingroup c_statinfo
 * \see mdbx_txn_commit_ex() */
  // struct MDBX_commit_latency {
  //   /** \brief Duration of preparation (commit child transactions, update
  //    * sub-databases records and cursors destroying). */
  //   uint32_t preparation;
  //   /** \brief Duration of GC update by wall clock. */
  //   uint32_t gc_wallclock;
  //   /** \brief Duration of internal audit if enabled. */
  //   uint32_t audit;
  //   /** \brief Duration of writing dirty/modified data pages to a filesystem,
  //    * i.e. the summary duration of a `write()` syscalls during commit. */
  //   uint32_t write;
  //   /** \brief Duration of syncing written data to the disk/storage, i.e.
  //    * the duration of a `fdatasync()` or a `msync()` syscall during commit. */
  //   uint32_t sync;
  //   /** \brief Duration of transaction ending (releasing resources). */
  //   uint32_t ending;
  //   /** \brief The total duration of a commit. */
  //   uint32_t whole;
  //   /** \brief User-mode CPU time spent on GC update. */
  //   uint32_t gc_cputime;

  //   /** \brief Информация для профилирования работы GC.
  //    * \note Статистика является общей для всех процессов работающих с одним
  //    * файлом БД и хранится в LCK-файле. Данные аккумулируются при фиксации всех
  //    * транзакций, но только в сборках libmdbx c установленной опцией
  //    * \ref MDBX_ENABLE_PROFGC. Собранная статистика возвращаются любому процессу
  //    * при использовании \ref mdbx_txn_commit_ex() и одновременно обнуляется
  //    * при завершении транзакций верхнего уровня (не вложенных). */
  //   struct {
  //     /** \brief Количество итераций обновления GC,
  //      *  больше 1 если были повторы/перезапуски. */
  //     uint32_t wloops;
  //     /** \brief Количество итераций слияния записей GC. */
  //     uint32_t coalescences;
  //     /** \brief Количество уничтожений предыдущих надежных/устойчивых
  //      *  точек фиксации при работе в режиме \ref MDBX_UTTERLY_NOSYNC. */
  //     uint32_t wipes;
  //     /** \brief Количество принудительных фиксаций на диск
  //      *  во избежания приращения БД при работе вне режима
  //      *  \ref MDBX_UTTERLY_NOSYNC. */
  //     uint32_t flushes;
  //     /** \brief Количество обращений к механизму Handle-Slow-Readers
  //      *  во избежания приращения БД.
  //      *  \see MDBX_hsr_func */
  //     uint32_t kicks;

  //     /** \brief Счетчик выполнения по медленному пути (slow path execution count)
  //      *  GC ради данных пользователя. */
  //     uint32_t work_counter;
  //     /** \brief Время "по настенным часам" затраченное на чтение и поиск внутри
  //      *  GC ради данных пользователя. */
  //     uint32_t work_rtime_monotonic;
  //     /** \brief Время ЦПУ в режиме пользователе затраченное
  //      *   на подготовку страниц извлекаемых из GC для данных пользователя,
  //      *   включая подкачку с диска. */
  //     uint32_t work_xtime_cpu;
  //     /** \brief Количество итераций поиска внутри GC при выделении страниц
  //      *  ради данных пользователя. */
  //     uint32_t work_rsteps;
  //     /** \brief Количество запросов на выделение последовательностей страниц
  //      *  ради данных пользователя. */
  //     uint32_t work_xpages;
  //     /** \brief Количество страничных промахов (page faults) внутри GC
  //      *  при выделении и подготовки страниц для данных пользователя. */
  //     uint32_t work_majflt;

  //     /** \brief Счетчик выполнения по медленному пути (slow path execution count)
  //      *  GC для целей поддержки и обновления самой GC. */
  //     uint32_t self_counter;
  //     /** \brief Время "по настенным часам" затраченное на чтение и поиск внутри
  //      *  GC для целей поддержки и обновления самой GC. */
  //     uint32_t self_rtime_monotonic;
  //     /** \brief Время ЦПУ в режиме пользователе затраченное на подготовку
  //      *  страниц извлекаемых из GC для целей поддержки и обновления самой GC,
  //      *  включая подкачку с диска. */
  //     uint32_t self_xtime_cpu;
  //     /** \brief Количество итераций поиска внутри GC при выделении страниц
  //      *  для целей поддержки и обновления самой GC. */
  //     uint32_t self_rsteps;
  //     /** \brief Количество запросов на выделение последовательностей страниц
  //      *  для самой GC. */
  //     uint32_t self_xpages;
  //     /** \brief Количество страничных промахов (page faults) внутри GC
  //      *  при выделении и подготовки страниц для самой GC. */
  //     uint32_t self_majflt;
  //   } gc_prof;
  // };
  // #ifndef __cplusplus
  // /** \ingroup c_statinfo */
  // typedef struct MDBX_commit_latency MDBX_commit_latency;
  // #endif
  'MDBX_commit_latency',
  /** \brief The fours integers markers (aka "canary") associated with the
 * environment.
 * \ingroup c_crud
 * \see mdbx_canary_put()
 * \see mdbx_canary_get()
 *
 * The `x`, `y` and `z` values could be set by \ref mdbx_canary_put(), while the
 * 'v' will be always set to the transaction number. Updated values becomes
 * visible outside the current transaction only after it was committed. Current
 * values could be retrieved by \ref mdbx_canary_get(). */
  // struct MDBX_canary {
  //   uint64_t x, y, z, v;
  // };
  // #ifndef __cplusplus
  // /** \ingroup c_crud */
  // typedef struct MDBX_canary MDBX_canary;
  // #endif
  'MDBX_canary',
  /** \brief libmdbx version information */
  // extern LIBMDBX_VERINFO_API const struct MDBX_version_info {
  //   uint8_t major;     /**< Major version number */
  //   uint8_t minor;     /**< Minor version number */
  //   uint16_t release;  /**< Release number of Major.Minor */
  //   uint32_t revision; /**< Revision number of Release */
  //   struct {
  //     const char *datetime; /**< committer date, strict ISO-8601 format */
  //     const char *tree;     /**< commit hash (hexadecimal digits) */
  //     const char *commit;   /**< tree hash, i.e. digest of the source code */
  //     const char *describe; /**< git-describe string */
  //   } git;                  /**< source information from git */
  //   const char *sourcery;   /**< sourcery anchor for pinning */
  // } /** \brief libmdbx version information */ mdbx_version;
  'MDBX_version_info',
  /** \brief libmdbx build information
   * \attention Some strings could be NULL in case no corresponding information
   *            was provided at build time (i.e. flags). */
  // extern LIBMDBX_VERINFO_API const struct MDBX_build_info {
  //   const char *datetime; /**< build timestamp (ISO-8601 or __DATE__ __TIME__) */
  //   const char *target;   /**< cpu/arch-system-config triplet */
  //   const char *options;  /**< mdbx-related options */
  //   const char *compiler; /**< compiler */
  //   const char *flags;    /**< CFLAGS and CXXFLAGS */
  // } /** \brief libmdbx build information */ mdbx_build;
  'MDBX_build_info',
])

const include_paths = ['deps']

export { api, includes, name, preamble, obj, libs, constants, structs, include_paths }




































// SIMPLE GET/SET TEST

// const log = (o) => console
//   .log(Object.getOwnPropertyNames(o).map(v => `${v}: ${o[v]}`).join('\n'))

// const start = Date.now()

// const { MDBX_NOSUBDIR, MDBX_CURRENT, MDBX_WRITEMAP, MDBX_SAFE_NOSYNC,
//   MDBX_CP_COMPACT,
//   MDBX_SUCCESS,
//   MDBX_RESULT_FALSE,
//   MDBX_RESULT_TRUE,
//   MDBX_KEYEXIST,
//   MDBX_FIRST_LMDB_ERRCODE,
//   MDBX_NOTFOUND,
//   MDBX_PAGE_NOTFOUND,
//   MDBX_CORRUPTED,
//   MDBX_PANIC,
//   MDBX_VERSION_MISMATCH,
//   MDBX_INVALID,
//   MDBX_MAP_FULL,
//   MDBX_DBS_FULL,
//   MDBX_READERS_FULL,
//   MDBX_TXN_FULL,
//   MDBX_CURSOR_FULL,
//   MDBX_PAGE_FULL,
//   MDBX_UNABLE_EXTEND_MAPSIZE,
//   MDBX_INCOMPATIBLE,
//   MDBX_BAD_RSLOT,
//   MDBX_BAD_TXN,
//   MDBX_BAD_VALSIZE,
//   MDBX_BAD_DBI,
//   MDBX_PROBLEM,
//   MDBX_LAST_LMDB_ERRCODE,
//   MDBX_BUSY,
//   MDBX_FIRST_ADDED_ERRCODE,
//   MDBX_EMULTIVAL,
//   MDBX_EBADSIGN,
//   MDBX_WANNA_RECOVERY,
//   MDBX_EKEYMISMATCH,
//   MDBX_TOO_LARGE,
//   MDBX_THREAD_MISMATCH,
//   MDBX_TXN_OVERLAPPING,
//   MDBX_BACKLOG_DEPLETED,
//   MDBX_DUPLICATED_CLK,
//   MDBX_LAST_ADDED_ERRCODE,
//   MDBX_ENODATA,
//   MDBX_EINVAL,
//   MDBX_EACCESS,
//   MDBX_ENOMEM,
//   MDBX_EROFS,
//   MDBX_ENOSYS,
//   MDBX_EIO,
//   MDBX_EPERM,
//   MDBX_EINTR,
//   MDBX_ENOFILE,
//   MDBX_EREMOTE,
//   MDBX_DB_DEFAULTS,
//   struct_MDBX_envinfo_size,
//   struct_MDBX_txn_info_size,
//   struct_MDBX_commit_latency_size,
//   struct_MDBX_val_size, } = lo.load('libmdbx').libmdbx
// const { mdbx_env_open0, mdbx_env_info_ex, mdbx_txn_begin_ex0,
//   mdbx_env_create, mdbx_env_close_ex, mdbx_txn_commit_ex,
//   mdbx_txn_info, mdbx_env_get_maxkeysize_ex0, mdbx_put0, mdbx_get_ex,
//   mdbx_dbi_open1, mdbx_dbi_close, mdbx_env_set_geometry0
// } = lo.load('libmdbx').libmdbx

// const return_codes = {
//   MDBX_SUCCESS,
//   MDBX_RESULT_FALSE,
//   MDBX_RESULT_TRUE,
//   MDBX_KEYEXIST,
//   MDBX_FIRST_LMDB_ERRCODE,
//   MDBX_NOTFOUND,
//   MDBX_PAGE_NOTFOUND,
//   MDBX_CORRUPTED,
//   MDBX_PANIC,
//   MDBX_VERSION_MISMATCH,
//   MDBX_INVALID,
//   MDBX_MAP_FULL,
//   MDBX_DBS_FULL,
//   MDBX_READERS_FULL,
//   MDBX_TXN_FULL,
//   MDBX_CURSOR_FULL,
//   MDBX_PAGE_FULL,
//   MDBX_UNABLE_EXTEND_MAPSIZE,
//   MDBX_INCOMPATIBLE,
//   MDBX_BAD_RSLOT,
//   MDBX_BAD_TXN,
//   MDBX_BAD_VALSIZE,
//   MDBX_BAD_DBI,
//   MDBX_PROBLEM,
//   MDBX_LAST_LMDB_ERRCODE,
//   MDBX_BUSY,
//   MDBX_FIRST_ADDED_ERRCODE,
//   MDBX_EMULTIVAL,
//   MDBX_EBADSIGN,
//   MDBX_WANNA_RECOVERY,
//   MDBX_EKEYMISMATCH,
//   MDBX_TOO_LARGE,
//   MDBX_THREAD_MISMATCH,
//   MDBX_TXN_OVERLAPPING,
//   MDBX_BACKLOG_DEPLETED,
//   MDBX_DUPLICATED_CLK,
//   MDBX_LAST_ADDED_ERRCODE,
//   MDBX_ENODATA,
//   MDBX_EINVAL,
//   MDBX_EACCESS,
//   MDBX_ENOMEM,
//   MDBX_EROFS,
//   MDBX_ENOSYS,
//   MDBX_EIO,
//   MDBX_EPERM,
//   MDBX_EINTR,
//   MDBX_ENOFILE,
//   MDBX_EREMOTE,
// }
// const { ptr, assert } = lo

// class MDBX_envinfo {
//   #buf = new Uint8Array(struct_MDBX_envinfo_size)
//   #ptr = ptr(this.#buf).ptr
//   #dv = new DataView(this.#buf.buffer)
//   /**@param {Uint8Array} buf*/
//   set buf(buf){
//     this.#buf = buf
//     this.#ptr = ptr(this.#buf).ptr
//     this.#dv = new DataView(this.#buf.buffer)
//   }
//   get ptr(){ return this.#ptr }
//   get dv(){ return this.#dv }
//   static mi_geo_offset = 0
//   static mi_geo_size = 5 * 8
//   static littleEndian = lo.core.little_endian
//   get mi_geo() {
//     const offset = MDBX_envinfo.mi_geo_offset
//     const t = this
//     return {
//       get lower(){
//         return t.dv.getBigUint64(offset + 0 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Lower limit for datafile size */
//       get upper(){
//         return t.dv.getBigUint64(offset + 1 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Upper limit for datafile size */
//       get current(){
//         return t.dv.getBigUint64(offset + 2 * 8, MDBX_envinfo.littleEndian)
//       }, /**< Current datafile size */
//       get shrink(){
//         return t.dv.getBigUint64(offset + 3 * 8, MDBX_envinfo.littleEndian)
//       },  /**< Shrink threshold for datafile */
//       get grow(){
//         return t.dv.getBigUint64(offset + 4 * 8, MDBX_envinfo.littleEndian)
//       },    /**< Growth step for datafile */
//     }
//   }
//     get mi_mapsize () {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 0 * 8, MDBX_envinfo.littleEndian)
//   };             /**< Size of the data memory map */
//     get mi_last_pgno() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 1 * 8, MDBX_envinfo.littleEndian)
//   };           /**< Number of the last used page */
//     get mi_recent_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 2 * 8, MDBX_envinfo.littleEndian)
//   };        /**< ID of the last committed transaction */
//     get mi_latter_reader_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 3 * 8, MDBX_envinfo.littleEndian)
//   }; /**< ID of the last reader transaction */
//     get mi_self_latter_reader_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 4 * 8, MDBX_envinfo.littleEndian)
//   }; /**< ID of the last reader transaction of caller process */
//   get mi_meta0_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 5 * 8, MDBX_envinfo.littleEndian)
//    };
//   get mi_meta0_sign() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 6 * 8, MDBX_envinfo.littleEndian)
//   };
//   get mi_meta1_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 7 * 8, MDBX_envinfo.littleEndian)
//   };
//   get mi_meta1_sign() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 8 * 8, MDBX_envinfo.littleEndian)
//   };
//   get mi_meta2_txnid() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 9 * 8, MDBX_envinfo.littleEndian)
//   };
//   get mi_meta2_sign() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getBigUint64(offset + 10 * 8, MDBX_envinfo.littleEndian)
//   };
//     get mi_maxreaders() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getUint32(offset + 11 * 8 + 0 * 4, MDBX_envinfo.littleEndian)
//   };   /**< Total reader slots in the environment */
//     get mi_numreaders() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getUint32(offset + 11 * 8 + 1 * 4, MDBX_envinfo.littleEndian)
//   };   /**< Max reader slots used in the environment */
//   get mi_dxb_pagesize() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getUint32(offset + 11 * 8 + 2 * 4, MDBX_envinfo.littleEndian)
//   }; /**< Database pagesize */
//   get mi_sys_pagesize() {
//     const offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size
//     return this.#dv.getUint32(offset + 11 * 8 + 3 * 4, MDBX_envinfo.littleEndian)
//   }; /**< System pagesize */

//   /** \brief A mostly unique ID that is regenerated on each boot.

//   As such it can be used to identify the local machine's current boot. MDBX
//   uses such when open the database to determine whether rollback required to
//   the last steady sync point or not. I.e. if current bootid is differ from the
//   value within a database then the system was rebooted and all changes since
//   last steady sync must be reverted for data integrity. Zeros mean that no
//   relevant information is available from the system. */
//   static mi_bootid_offset = MDBX_envinfo.mi_geo_offset + MDBX_envinfo.mi_geo_size + 11 * 8 + 4 * 4
//   static mi_bootid_size = 4 * 2 * 8
//   get mi_bootid(){
//     const offset = MDBX_envinfo.mi_bootid_offset
//     const t = this
//     return {
//       get current(){
//         return {
//           get x(){
//             return t.dv.getBigUint64(offset + 0 * 16, MDBX_envinfo.littleEndian)
//           },
//           get y(){
//             return t.dv.getBigUint64(offset + 0 * 16 + 8, MDBX_envinfo.littleEndian)
//           },
//         }
//       },
//       get meta0(){
//         return {
//           get x(){
//             return t.dv.getBigUint64(offset + 1 * 16, MDBX_envinfo.littleEndian)
//           },
//           get y(){
//             return t.dv.getBigUint64(offset + 1 * 16 + 8, MDBX_envinfo.littleEndian)
//           },
//         }
//       },
//       get meta1(){
//         return {
//           get x(){
//             return t.dv.getBigUint64(offset + 2 * 16, MDBX_envinfo.littleEndian)
//           },
//           get y(){
//             return t.dv.getBigUint64(offset + 2 * 16 + 8, MDBX_envinfo.littleEndian)
//           },
//         }
//       },
//       get meta2(){
//         return {
//           get x(){
//             return t.dv.getBigUint64(offset + 3 * 16, MDBX_envinfo.littleEndian)
//           },
//           get y(){
//             return t.dv.getBigUint64(offset + 3 * 16 + 8, MDBX_envinfo.littleEndian)
//           },
//         }
//       },
//     }
//   };

//   /** Bytes not explicitly synchronized to disk */
//   get mi_unsync_volume() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getBigUint64(offset + 0 * 8, MDBX_envinfo.littleEndian)
//   };
//   /** Current auto-sync threshold, see \ref mdbx_env_set_syncbytes(). */
//   get mi_autosync_threshold() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getBigUint64(offset + 1 * 8, MDBX_envinfo.littleEndian)
//   };
//   /** Time since entering to a "dirty" out-of-sync state in units of 1/65536 of
//    * second. In other words, this is the time since the last non-steady commit
//    * or zero if it was steady. */
//   get mi_since_sync_seconds16dot16() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getUint32(offset + 2 * 8 + 0 * 4, MDBX_envinfo.littleEndian)
//   };
//   /** Current auto-sync period in 1/65536 of second,
//    * see \ref mdbx_env_set_syncperiod(). */
//   get mi_autosync_period_seconds16dot16() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getUint32(offset + 2 * 8 + 1 * 4, MDBX_envinfo.littleEndian)
//   };
//   /** Time since the last readers check in 1/65536 of second,
//    * see \ref mdbx_reader_check(). */
//   get mi_since_reader_check_seconds16dot16() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getUint32(offset + 2 * 8 + 2 * 4, MDBX_envinfo.littleEndian)
//   };
//   /** Current environment mode.
//    * The same as \ref mdbx_env_get_flags() returns. */
//   get mi_mode() {
//     const offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size
//     return this.#dv.getUint32(offset + 2 * 8 + 3 * 4, MDBX_envinfo.littleEndian)
//   };

//   /** Statistics of page operations.
//    * \details Overall statistics of page operations of all (running, completed
//    * and aborted) transactions in the current multi-process session (since the
//    * first process opened the database after everyone had previously closed it).
//    */
//   static mi_pgop_stat_offset = MDBX_envinfo.mi_bootid_offset + MDBX_envinfo.mi_bootid_size + 2 * 8 + 4 * 4
//   static mi_pgop_stat_size = 12 * 8
//   get mi_pgop_stat(){
//     const offset = MDBX_envinfo.mi_pgop_stat_offset
//     const t = this
//     return {
//       get newly(){
//         return t.dv.getBigUint64(offset + 0 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Quantity of a new pages added */
//       get cow(){
//         return t.dv.getBigUint64(offset + 1 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Quantity of pages copied for update */
//       get clone(){
//         return t.dv.getBigUint64(offset + 2 * 8, MDBX_envinfo.littleEndian)
//       }, /**< Quantity of parent's dirty pages clones
//       for nested transactions */
//       get split(){
//         return t.dv.getBigUint64(offset + 3 * 8, MDBX_envinfo.littleEndian)
//       },  /**< Page splits */
//       get merge(){
//         return t.dv.getBigUint64(offset + 4 * 8, MDBX_envinfo.littleEndian)
//       },    /**< Page merges */
//       get spill(){
//         return t.dv.getBigUint64(offset + 5 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Quantity of spilled dirty pages */
//       get unspill(){
//         return t.dv.getBigUint64(offset + 6 * 8, MDBX_envinfo.littleEndian)
//       },   /**< Quantity of unspilled/reloaded pages */
//       get wops(){
//         return t.dv.getBigUint64(offset + 7 * 8, MDBX_envinfo.littleEndian)
//       }, /**< Number of explicit write operations (not a pages)
//       to a disk */
//       get prefault(){
//         return t.dv.getBigUint64(offset + 8 * 8, MDBX_envinfo.littleEndian)
//       },  /**< Number of prefault write operations (not a pages) */
//       get mincore(){
//         return t.dv.getBigUint64(offset + 9 * 8, MDBX_envinfo.littleEndian)
//       },    /**< Number of mincore() calls */
//       get msync(){
//         return t.dv.getBigUint64(offset + 10 * 8, MDBX_envinfo.littleEndian)
//       },    /**< Number of explicit msync-to-disk operations (not a pages) */
//       get fsync(){
//         return t.dv.getBigUint64(offset + 11 * 8, MDBX_envinfo.littleEndian)
//       },    /**< Number of explicit fsync-to-disk operations (not a pages) */
//     }
//   };
// }

// assert(MDBX_envinfo.mi_pgop_stat_offset + MDBX_envinfo.mi_pgop_stat_size === struct_MDBX_envinfo_size)


// class MDBX_commit_latency {
//   #buf = new Uint8Array(struct_MDBX_commit_latency_size)
//   #ptr = ptr(this.#buf).ptr
//   #dv = new DataView(this.#buf.buffer)
//   /**@param {Uint8Array} buf*/
//   set buf(buf){
//     this.#buf = buf
//     this.#ptr = ptr(this.#buf).ptr
//     this.#dv = new DataView(this.#buf.buffer)
//   }
//   get ptr(){ return this.#ptr }
//   get dv(){ return this.#dv }
//   static littleEndian = lo.core.little_endian
//   //   /** \brief Duration of preparation (commit child transactions, update
//   //    * sub-databases records and cursors destroying). */
//   get preparation(){
//   const t  = this
//   return t.dv.getUint32(0 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief Duration of GC update by wall clock. */
//   get gc_wallclock(){
//   const t  = this
//   return t.dv.getUint32(1 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief Duration of internal audit if enabled. */
//   get audit(){
//   const t  = this
//   return t.dv.getUint32(2 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief Duration of writing dirty/modified data pages to a filesystem,
//   //    * i.e. the summary duration of a `write()` syscalls during commit. */
//   get write(){
//   const t  = this
//   return t.dv.getUint32(3 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief Duration of syncing written data to the disk/storage, i.e.
//   //    * the duration of a `fdatasync()` or a `msync()` syscall during commit. */
//   get sync(){
//   const t  = this
//   return t.dv.getUint32(4 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief Duration of transaction ending (releasing resources). */
//   get ending(){
//   const t  = this
//   return t.dv.getUint32(5 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief The total duration of a commit. */
//   get whole(){
//   const t  = this
//   return t.dv.getUint32(6 * 4, MDBX_commit_latency.littleEndian)
//   };
//   //   /** \brief User-mode CPU time spent on GC update. */
//   get gc_cputime(){
//   const t  = this
//   return t.dv.getUint32(7 * 4, MDBX_commit_latency.littleEndian)
//   };

//   //   /** \brief Информация для профилирования работы GC.
//   //    * \note Статистика является общей для всех процессов работающих с одним
//   //    * файлом БД и хранится в LCK-файле. Данные аккумулируются при фиксации всех
//   //    * транзакций, но только в сборках libmdbx c установленной опцией
//   //    * \ref MDBX_ENABLE_PROFGC. Собранная статистика возвращаются любому процессу
//   //    * при использовании \ref mdbx_txn_commit_ex() и одновременно обнуляется
//   //    * при завершении транзакций верхнего уровня (не вложенных). */
//   //   struct {
//   //     /** \brief Количество итераций обновления GC,
//   //      *  больше 1 если были повторы/перезапуски. */
//   static gc_prof_offset = 8 * 4
//   static gc_prof_size = 17 * 4
//   get gc_prof() {
//     const offset = MDBX_commit_latency.gc_prof_offset
//     const t  = this
//     return {
//       get wloops(){
//         return t.dv.getUint32(offset + 0 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество итераций слияния записей GC. */
//       get coalescences(){
//         return t.dv.getUint32(offset + 1 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество уничтожений предыдущих надежных/устойчивых
//       //      *  точек фиксации при работе в режиме \ref MDBX_UTTERLY_NOSYNC. */
//       get wipes(){
//         return t.dv.getUint32(offset + 2 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество принудительных фиксаций на диск
//       //      *  во избежания приращения БД при работе вне режима
//       //      *  \ref MDBX_UTTERLY_NOSYNC. */
//       get flushes(){
//         return t.dv.getUint32(offset + 3 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество обращений к механизму Handle-Slow-Readers
//       //      *  во избежания приращения БД.
//       //      *  \see MDBX_hsr_func */
//       get kicks(){
//         return t.dv.getUint32(offset + 4 * 4, MDBX_commit_latency.littleEndian)
//       },

//       //     /** \brief Счетчик выполнения по медленному пути (slow path execution count)
//       //      *  GC ради данных пользователя. */
//       get work_counter(){
//         return t.dv.getUint32(offset + 5 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Время "по настенным часам" затраченное на чтение и поиск внутри
//       //      *  GC ради данных пользователя. */
//       get work_rtime_monotonic(){
//         return t.dv.getUint32(offset + 6 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Время ЦПУ в режиме пользователе затраченное
//       //      *   на подготовку страниц извлекаемых из GC для данных пользователя,
//       //      *   включая подкачку с диска. */
//       get work_xtime_cpu(){
//         return t.dv.getUint32(offset + 7 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество итераций поиска внутри GC при выделении страниц
//       //      *  ради данных пользователя. */
//       get work_rsteps(){
//         return t.dv.getUint32(offset + 8 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество запросов на выделение последовательностей страниц
//       //      *  ради данных пользователя. */
//       get work_xpages(){
//         return t.dv.getUint32(offset + 9 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество страничных промахов (page faults) внутри GC
//       //      *  при выделении и подготовки страниц для данных пользователя. */
//       get work_majflt(){
//         return t.dv.getUint32(offset + 10 * 4, MDBX_commit_latency.littleEndian)
//       },

//       //     /** \brief Счетчик выполнения по медленному пути (slow path execution count)
//       //      *  GC для целей поддержки и обновления самой GC. */
//       get self_counter(){
//         return t.dv.getUint32(offset + 11 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Время "по настенным часам" затраченное на чтение и поиск внутри
//       //      *  GC для целей поддержки и обновления самой GC. */
//       get self_rtime_monotonic(){
//         return t.dv.getUint32(offset + 12 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Время ЦПУ в режиме пользователе затраченное на подготовку
//       //      *  страниц извлекаемых из GC для целей поддержки и обновления самой GC,
//       //      *  включая подкачку с диска. */
//       get self_xtime_cpu(){
//         return t.dv.getUint32(offset + 13 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество итераций поиска внутри GC при выделении страниц
//       //      *  для целей поддержки и обновления самой GC. */
//       get self_rsteps(){
//         return t.dv.getUint32(offset + 14 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество запросов на выделение последовательностей страниц
//       //      *  для самой GC. */
//       get self_xpages(){
//         return t.dv.getUint32(offset + 15 * 4, MDBX_commit_latency.littleEndian)
//       },
//       //     /** \brief Количество страничных промахов (page faults) внутри GC
//       //      *  при выделении и подготовки страниц для самой GC. */
//       get self_majflt(){
//         return t.dv.getUint32(offset + 16 * 4, MDBX_commit_latency.littleEndian)
//       }
//     }
//   }
// }

// assert(MDBX_commit_latency.gc_prof_offset + MDBX_commit_latency.gc_prof_size === struct_MDBX_commit_latency_size)


// class MDBX_val {
//   #buf = new Uint8Array(struct_MDBX_val_size)
//   #val_buf = ptr(new Uint8Array(0))
//   #ptr = ptr(this.#buf).ptr
//   #dv = new DataView(this.#buf.buffer)
//   /**@param {Uint8Array} buf*/
//   set buf(buf){
//     this.#val_buf = ptr(buf)
//     this.iov_base = this.#val_buf.ptr
//     this.iov_len = this.#val_buf.byteLength
//   }
//   get buf(){ return this.#val_buf }
//   get ptr(){ return this.#ptr }
//   get dv(){ return this.#dv }
//   static littleEndian = lo.core.little_endian

//   set iov_base(v){
//     this.dv.setBigUint64(0, BigInt(v), MDBX_val.littleEndian)
//   }
//   get iov_base(){
//     return Number(this.dv.getBigUint64(0, MDBX_val.littleEndian))
//   }
//   set iov_len(v){
//     this.dv.setBigUint64(8, BigInt(v), MDBX_val.littleEndian)
//   }
//   get iov_len(){
//     return Number(this.dv.getBigUint64(8, MDBX_val.littleEndian))
//   }
// }
// assert(struct_MDBX_val_size == 16)

// const ptr_to_env = ptr(new BigUint64Array(1))
// assert(mdbx_env_create(ptr_to_env.ptr) == 0)
// console.log('\nmdbx_env_create')

// const MDBX_env_ptr = Number(ptr_to_env[0])
// log({ ptr_to_env, MDBX_env_ptr })

// const s_ptr = ptr(new BigUint64Array([
//   BigInt(32 * 1024 * 1024),
//   BigInt(32 * 1024 * 1024),
//   BigInt(1 * 1024 * 1024 * 1024),
//   BigInt(32 * 1024 * 1024),
//   BigInt(64 * 1024 * 1024),
//   BigInt(16 * 1024)
// ]))
// assert(mdbx_env_set_geometry0(MDBX_env_ptr, s_ptr.ptr) == 0)

// const db_mode = MDBX_NOSUBDIR | MDBX_WRITEMAP | MDBX_SAFE_NOSYNC
// const ssd_db = '/ssd/mdbx.db'
// const hdd_db = './mdbx.db'
// assert(mdbx_env_open0(MDBX_env_ptr, hdd_db, db_mode, 0o600) == 0)
// console.log('\nmdbx_env_open0')

// const max_key_size = mdbx_env_get_maxkeysize_ex0(MDBX_env_ptr, MDBX_DB_DEFAULTS)
// assert(max_key_size > -1)
// console.log('\nmdbx_env_get_maxkeysize_ex0')
// log({ max_key_size })

// const ptr_to_txn = ptr(new BigUint64Array(1))
// const txnContext = ptr(new Uint8Array(0))
// assert(mdbx_txn_begin_ex0(MDBX_env_ptr, 0, ptr_to_txn.ptr, txnContext.ptr) == 0)
// console.log('\nmdbx_txn_begin_ex0')

// const txn_ptr = Number(ptr_to_txn[0])
// // log(txnPtr)
// // log(txnContext)

// const ptr_to_dbi = ptr(new Uint32Array(1))
// assert(mdbx_dbi_open1(txn_ptr, MDBX_DB_DEFAULTS, ptr_to_dbi.ptr) == 0)
// console.log('\nmdbx_dbi_open1')

// const dbi = ptr_to_dbi[0]
// log({ dbi })

// const loop_start = Date.now()
// const key_val = new MDBX_val()
// const data_val = new MDBX_val()
// const res_data_val = new MDBX_val()
// const reps = 1
// const decoder = new TextDecoder()
// const encoder = new TextEncoder()
// for (let i = 0; i < reps; i++) {
//   key_val.buf = encoder.encode('some key'+ i)
//   data_val.buf = encoder.encode('some data'+ i)
//   assert(mdbx_put0(txn_ptr, dbi, key_val.ptr, data_val.ptr, 0) == 0)
//   console.log('\nmdbx_put0')

//   assert(mdbx_get_ex(txn_ptr, dbi, key_val.ptr, res_data_val.ptr, 0) == 0)
//   console.log('\nmdbx_get_ex')

//   console.log(res_data_val.iov_len)
//   console.log(res_data_val.iov_base)
//   const res_data_val_buf = ptr(new Uint8Array(res_data_val.iov_len))
//   lo.core.memcpy(res_data_val_buf.ptr, res_data_val.iov_base, res_data_val.iov_len)
//   const str = decoder.decode(res_data_val_buf)
//   console.log(str)
// }
// console.log(`\nloop_end: ${Date.now() - loop_start}`)

// const txn_info = ptr(new Uint8Array(struct_MDBX_txn_info_size))
// assert(mdbx_txn_info(txn_ptr, txn_info.ptr, 1) == 0)
// console.log('\nmdbx_txn_info')
// // console.log('txn_info:')
// // log(txn_info)

// const env_info = new MDBX_envinfo()
// assert(mdbx_env_info_ex(MDBX_env_ptr, txn_ptr, env_info.ptr, struct_MDBX_envinfo_size) == 0)
// console.log('\nmdbx_env_info_ex')
// const { mi_geo, mi_pgop_stat, mi_bootid,
//   mi_autosync_period_seconds16dot16,
//   mi_autosync_threshold,
//   mi_dxb_pagesize,
//   mi_last_pgno,
//   mi_latter_reader_txnid,
//   mi_mapsize,
//   mi_maxreaders,
//   mi_meta0_sign,
//   mi_meta0_txnid,
//   mi_meta1_sign,
//   mi_meta1_txnid,
//   mi_meta2_sign,
//   mi_meta2_txnid,
//   mi_mode,
//   mi_numreaders,
//   mi_recent_txnid,
//   mi_self_latter_reader_txnid,
//   mi_since_reader_check_seconds16dot16,
//   mi_since_sync_seconds16dot16,
//   mi_sys_pagesize,
//   mi_unsync_volume,
//  } = env_info
// console.log('env_info:')
// log({
//   mi_autosync_period_seconds16dot16,
//   mi_autosync_threshold,
//   mi_dxb_pagesize,
//   mi_last_pgno,
//   mi_latter_reader_txnid,
//   mi_mapsize,
//   mi_maxreaders,
//   mi_meta0_sign,
//   mi_meta0_txnid,
//   mi_meta1_sign,
//   mi_meta1_txnid,
//   mi_meta2_sign,
//   mi_meta2_txnid,
//   mi_mode,
//   mi_numreaders,
//   mi_recent_txnid,
//   mi_self_latter_reader_txnid,
//   mi_since_reader_check_seconds16dot16,
//   mi_since_sync_seconds16dot16,
//   mi_sys_pagesize,
//   mi_unsync_volume,
// })
// console.log('env_info.mi_geo:')
// log(mi_geo)
// console.log('env_info.mi_pgop_stat:')
// log(mi_pgop_stat)
// Object.keys(mi_bootid).forEach((k)  => {
//   console.log('env_info.mi_bootid.'+ k +':')
//   log(mi_bootid[k])
// })

// const commit_latency = new MDBX_commit_latency()
// assert(mdbx_txn_commit_ex(txn_ptr, commit_latency.ptr) == 0)
// console.log('\nmdbx_txn_commit_ex')
// console.log('commitLatency:')
// const {
//   gc_prof,
//   audit,
//   ending,
//   gc_cputime,
//   gc_wallclock,
//   preparation,
//   sync,
//   whole,
//   write
// } = commit_latency
// log({
//   audit,
//   ending,
//   gc_cputime,
//   gc_wallclock,
//   preparation,
//   sync,
//   whole,
//   write
// })
// console.log('commitLatency.gc_prof:')
// log(gc_prof)

// // doesn't work here
// // assert(mdbx_dbi_close(txn_ptr, dbi_ptr) == 0)
// // console.log('mdbx_dbi_close')

// assert(mdbx_env_close_ex(MDBX_env_ptr, 1) == 0)
// console.log('\nmdbx_env_close_ex')

// export {}


// console.log(`\ntotal: ${Date.now() - start}`);
