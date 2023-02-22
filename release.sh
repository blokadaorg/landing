#!/bin/sh

#
# This file is part of Blokada.
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
#
# Copyright © 2023 Blocka AB. All rights reserved.
#
# @author Karol Gusak (karol@blocka.net)
#

set -e


./sync-translations.sh

tag=$(git describe --abbrev=4 --always --tags --dirty)

commit="release: $tag"

echo "Marking release: $tag..."

git tag $tag

echo "Done. Run this to push:"
echo "git push --atomic origin main $tag"
