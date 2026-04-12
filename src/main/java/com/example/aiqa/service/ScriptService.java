package com.example.aiqa.service;

import com.example.aiqa.dto.ScriptDto;
import java.util.List;

public interface ScriptService {
    List<ScriptDto> getAllScripts();
    List<ScriptDto> getScriptsByProjectId(Long projectId);
    ScriptDto getScriptById(Long id);
    ScriptDto createScript(ScriptDto scriptDto);
    ScriptDto updateScript(Long id, ScriptDto scriptDto);
    void deleteScript(Long id);
}
