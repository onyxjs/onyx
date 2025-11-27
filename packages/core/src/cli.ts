#!/usr/bin/env node

import { runTestsCLI } from "./runner";

const args = process.argv.slice(2);
const patternArg = args[0] ? new RegExp(args[0]) : undefined;

const onyxStr = `
    ,----..                                                                        
   /   /   \                                                                       
  /   .     :                                                                      
 .   /   ;.  \       ,---,                                        .--.             
.   ;   /  ' ;   ,-+-. /  |              ,--,  ,--,             .--,'|   .--.--.   
;   |  ; \ ; |  ,--.'|'   |       .--,   |'. \/ .'|             |  |.   /  /    '  
|   :  | ; | ' |   |  ,"' |     /_ ./|   '  \/  / ;             '--'_  |  :  /'./  
.   |  ' ' ' : |   | /  | |  , ' , ' :    \  \.' /              ,--,'| |  :  ;_    
'   ;  \; /  | |   | |  | | /___/ \: |     \  ;  ;              |  | '  \  \    '. 
 \   \  ',  /  |   | |  |/   .  \  ' |    / \  \  \             :  | |   '----.   \
  ;   :    /   |   | |--'     \  ;   :  ./__;   ;  \  ___     __|  : '  /  /'--'  /
   \   \ .'    |   |/          \  \  ;  |   :/\  \ ; /  .\  .'__/\_: | '--'.     / 
    '---'      '---'            :  \  \ '---'  '--'  \  ; | |   :    :   '--'---'  
                                 \  ' ;               '--"   \   \  /              
                                  '--'                        '--'-'               
`

runTestsCLI({ pattern: patternArg }).catch(err => {
  console.error(err);
  process.exit(1);
});
