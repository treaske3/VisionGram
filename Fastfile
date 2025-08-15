default_platform(:ios)

platform :ios do
  desc "CI: build and upload to TestFlight"
  lane :ci_beta do
    create_keychain(
      name: "ci_keychain",
      default_keychain: true,
      unlock: true,
      timeout: 3600,
      lock_when_sleeps: false
    )

    api_key = app_store_connect_api_key(
      key_id: ENV["ASC_KEY_ID"],
      issuer_id: ENV["ASC_ISSUER_ID"],
      key_content: ENV["ASC_API_KEY_P8"],
      is_key_content_base64: false,
      in_house: false
    )

    match(
      type: "appstore",
      readonly: false,
      git_url: ENV["MATCH_GIT_URL"],
      git_basic_authorization: ENV["MATCH_GIT_BASIC_AUTHORIZATION"],
      storage_mode: "git",
      app_identifier: [ENV["APP_IDENTIFIER"]],
      keychain_name: "ci_keychain",
      keychain_password: "",
      verbose: true
    )

    # >>> Explicitly locate the workspace under ios/
    xcworkspace = Dir["ios/*.xcworkspace"].first
    UI.user_error!("No .xcworkspace found in ios/") unless xcworkspace

    # >>> Force a scheme so Fastlane never tries to auto-detect at repo root
    #     If you change your app name, you can set a repo variable IOS_SCHEME in GitHub.
    scheme_name = ENV["IOS_SCHEME"] || "VisionGram"

    build_ios_app(
      workspace: xcworkspace,     # e.g., ios/VisionGram.xcworkspace
      scheme: scheme_name,        # e.g., VisionGram
      configuration: "Release",
      export_method: "app-store",
      clean: true
    )

    upload_to_app_store(
      api_key: api_key,
      skip_screenshots: true,
      skip_metadata: true,
      reject_if_possible: false,
      submit_for_review: false
    )
  ensure
    delete_keychain(name: "ci_keychain") rescue nil
  end
end
