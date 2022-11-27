############################################################################################
#                       NSIS Reset To Factory Script For GC Studio  V.1.00
#                                   By Angel Mier                              
############################################################################################

######################################################################
# Includes

######################################################################
# Installer Configuration

!define APP_NAME "GC Studio"
!define COMP_NAME "Mier Engineering"
!define WEB_SITE "https://www.gcbasic.com"
!define VERSION "1.02.00.00"
!define COPYRIGHT "Copyright © 2007 - 2022"
!define DESCRIPTION "Application"
!define INSTALLER_NAME ".\ResetToFactory.exe"
!define MAIN_APP_EXE "ResetToFactory.exe"
!define INSTALL_TYPE "SetShellVarContext current"
######################################################################
# Bynary Information

VIProductVersion  "${VERSION}"
VIAddVersionKey "ProductName"  "${APP_NAME}"
VIAddVersionKey "CompanyName"  "${COMP_NAME}"
VIAddVersionKey "LegalCopyright"  "${COPYRIGHT}"
VIAddVersionKey "FileDescription"  "${DESCRIPTION}"
VIAddVersionKey "FileVersion"  "${VERSION}"

######################################################################
# Compression and installer settings

SetCompressor /solid LZMA
SetCompressorDictSize 64
SetDatablockOptimize ON
Name "${APP_NAME}"
Caption "${APP_NAME} Reset to Factory"
OutFile "${INSTALLER_NAME}"
BrandingText "${APP_NAME}"
XPStyle on
InstallDir "$EXEDIR"
RequestExecutionLevel user

######################################################################
# Main program, Post Update Files
Icon ".\res\GCstudio.ico"
Section -MainProgram
${INSTALL_TYPE}
SetOverwrite on

#Clear
RMDir /r "$INSTDIR\vscode\data"
Delete "$INSTDIR\GCstudio.config.json"
Delete "$INSTDIR\GCstudio.mrf.json"

#Reset
SetOutPath "$INSTDIR\vscode\data\extensions\MierEngineering.GreatCowBasic-1.0.0\"
File /r /x node_modules "..\MierEngineering.GreatCowBasic-1.0.0\*"
SetOutPath "$INSTDIR\vscode\data\extensions\"
File /r "..\extensions\*"
SetOutPath "$INSTDIR\vscode\data\user-data\"
File /r "..\user-data\*"

SectionEnd


######################################################################
