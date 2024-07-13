// https://github.com/curl/curl/releases/download/curl-8_5_0/curl-8.5.0.tar.gz

import { fetch } from 'lib/curl.js'
import { isFile } from 'lib/fs.js'
import { exec } from 'lib/proc.js'

const version = '0.12.10'
const archive_name = 'libmdbx.tar.xz'
async function build () {
  const { assert, core } = lo
  const {
    chdir, mkdir, S_IRWXU, S_IRWXG, S_IROTH, S_IXOTH
  } = core

  if (!isFile('deps/cmake')) {
    mkdir('deps', S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH)
    assert(chdir('deps') === 0)
    if (!isFile(archive_name)) {
      console.log('fetching release')
      fetch(`https://libmdbx.dqdkfa.ru/release/libmdbx-amalgamated-${version}.tar.xz`,
        archive_name)
    }
    assert(exec('tar', ['-xf', archive_name])[0] === 0)
    assert(chdir('../') === 0)
  }
  const { obj } = await import('lib/libmdbx/api.js')
  if (obj.some(o => !isFile(o))) {
    assert(chdir('deps') === 0)
    // assert(exec('make', ['clean'])[0] === 0)
    assert(exec('make', obj.map(o => o.replace(/^deps\//, '')))[0] === 0)
    assert(chdir('../') === 0)
  }
}

export { build }
